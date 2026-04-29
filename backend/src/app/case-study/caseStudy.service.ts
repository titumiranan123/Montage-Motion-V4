/* eslint-disable @typescript-eslint/no-explicit-any */
// =============================================
// services/caseStudy.service.ts
// =============================================

import {
  CreateCaseStudyInput,
  UpdateCaseStudyInput,
  ListQueryInput,
  CreateClientInput,
  UpdateClientInput,
  CreateAuthorInput,
  UpdateAuthorInput,
  CreateTagInput,
} from './caseStudy.zod';
import {
  CaseStudy,
  CaseStudyData,
  ClientRecord,
  Author,
  Tag,
} from './caseStudy.type';
import { db } from '../../db/db';

// =============================================
// CASE STUDY
// =============================================

export async function createCaseStudy(
  input: CreateCaseStudyInput
): Promise<CaseStudy> {
  const { rows } = await db.query<CaseStudy>(
    `INSERT INTO case_studies (
       slug, title_normal, title_highlight, title_suffix, description,
       type, status, author_id, client_id, published_at, read_time_min,
       tag_slugs, hero_stats, metrics, challenge, solution,
       outcome, testimonials, related, media, seo
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,
       $12,$13,$14,$15,$16,$17,$18,$19,$20,$21
     ) RETURNING *`,
    [
      input.slug,
      input.title_normal    ?? null,
      input.title_highlight ?? null,
      input.title_suffix    ?? null,
      input.description     ?? null,
      input.type,
      input.status,
      input.author_id       ?? null,
      input.client_id       ?? null,
      input.published_at    ?? null,
      input.read_time_min   ?? null,
      input.tag_slugs,
      JSON.stringify(input.hero_stats),
      JSON.stringify(input.metrics),
      JSON.stringify(input.challenge   ?? {}),
      JSON.stringify(input.solution    ?? {}),
      JSON.stringify(input.outcome     ?? {}),
      JSON.stringify(input.testimonials),
      JSON.stringify(input.related),
      JSON.stringify(input.media),
      JSON.stringify(input.seo         ?? {}),
    ]
  );
  return rows[0];
}

function toData(row: any): CaseStudyData | null {
  if (!row) return null;
  return {
    hero: {
      title: {
        normal:    row.title_normal    ?? '',
        highlight: row.title_highlight ?? '',
        suffix:    row.title_suffix    ?? '',
      },
      description: row.description ?? '',
      tags:        row.tag_slugs   ?? [],
      stats:       row.hero_stats  ?? [],
    },
    metrics:   row.metrics  ?? [],
    client:    row.client   ?? null,
    challenge: row.challenge ?? { intro: '', items: [] },
    solution:  row.solution  ?? { intro: '', phases: [] },
    outcome:   row.outcome   ?? { description: '', before: [], after: [] },
    testimonial: row.testimonials?.[0]
      ? {
          quote: row.testimonials[0].quote,
          name:  row.testimonials[0].name,
          role:  row.testimonials[0].role,
        }
      : null,
    more: row.related ?? [],
  };
}

async function fetchDetail(
  where: string,
  param: string
): Promise<CaseStudyData | null> {
  const { rows } = await db.query(
    `SELECT
       cs.*,
       CASE WHEN c.id IS NOT NULL THEN json_build_object(
         'name',        c.name,
         'meta',        c.meta,
         'tags',        c.tags,
         'description', c.meta,
         'sidebar', json_build_object(
           'industry', c.industry,
           'teamSize', c.team_size,
           'stage',    c.stage,
           'location', c.location
         )
       ) ELSE NULL END AS client
     FROM case_studies cs
     LEFT JOIN clients c ON c.id = cs.client_id
     WHERE ${where}`,
    [param]
  );
  return toData(rows[0]);
}

export async function getCaseStudyById(
  id: string
): Promise<CaseStudyData | null> {
  return fetchDetail('cs.id = $1', id);
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyData | null> {
  return fetchDetail('cs.slug = $1', slug);
}

export async function getCaseStudyRaw(
  slug: string
): Promise<CaseStudy | null> {
  const { rows } = await db.query<CaseStudy>(
    `SELECT * FROM case_studies WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function listCaseStudies(query: ListQueryInput) {
  const conditions: string[] = [];
  const values:     unknown[] = [];
  let idx = 1;

  if (query.type) {
    conditions.push(`type = $${idx++}`);
    values.push(query.type);
  }
  if (query.status) {
    conditions.push(`status = $${idx++}`);
    values.push(query.status);
  }
  if (query.tag) {
    conditions.push(`$${idx++} = ANY(tag_slugs)`);
    values.push(query.tag);
  }
  if (query.search) {
    conditions.push(
      `(title_normal ILIKE $${idx} OR title_highlight ILIKE $${idx} OR description ILIKE $${idx})`
    );
    values.push(`%${query.search}%`);
    idx++;
  }

  const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (query.page - 1) * query.limit;

  const countRes = await db.query(
    `SELECT COUNT(*) FROM case_studies ${where}`,
    values
  );

  const { rows } = await db.query(
    `SELECT
       id, slug, title_normal, title_highlight, title_suffix,
       description, type, status, published_at, read_time_min,
       tag_slugs, hero_stats, metrics, created_at
     FROM case_studies
     ${where}
     ORDER BY created_at DESC
     LIMIT $${idx++} OFFSET $${idx++}`,
    [...values, query.limit, offset]
  );

  return {
    data:  rows,
    total: Number(countRes.rows[0].count),
    page:  query.page,
    limit: query.limit,
    pages: Math.ceil(Number(countRes.rows[0].count) / query.limit),
  };
}

export async function updateCaseStudy(
  id: string,
  input: UpdateCaseStudyInput
): Promise<CaseStudyData | null> {
  const scalarFields = [
    'slug', 'title_normal', 'title_highlight', 'title_suffix',
    'description', 'type', 'status', 'author_id', 'client_id',
    'published_at', 'read_time_min',
  ] as const;

  const jsonFields = [
    'hero_stats', 'metrics', 'challenge', 'solution',
    'outcome', 'testimonials', 'related', 'media', 'seo',
  ] as const;

  const arrayFields = ['tag_slugs'] as const;

  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const key of scalarFields) {
    if (key in input) {
      fields.push(`${key} = $${idx++}`);
      values.push((input as any)[key] ?? null);
    }
  }

  for (const key of jsonFields) {
    if (key in input) {
      fields.push(`${key} = $${idx++}`);
      values.push(JSON.stringify((input as any)[key]));
    }
  }

  for (const key of arrayFields) {
    if (key in input) {
      fields.push(`${key} = $${idx++}`);
      values.push((input as any)[key]);
    }
  }

  if (!fields.length) return getCaseStudyById(id);

  values.push(id);
  const { rowCount } = await db.query(
    `UPDATE case_studies SET ${fields.join(', ')} WHERE id = $${idx}`,
    values
  );

  if (!rowCount) return null;
  return getCaseStudyById(id);
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  const { rowCount } = await db.query(
    `DELETE FROM case_studies WHERE id = $1`,
    [id]
  );
  return (rowCount ?? 0) > 0;
}

export async function publishCaseStudy(id: string): Promise<CaseStudy | null> {
  const { rows } = await db.query<CaseStudy>(
    `UPDATE case_studies
     SET status = 'published', published_at = CURRENT_DATE, updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0] ?? null;
}

// =============================================
// CLIENT
// =============================================

export async function createClient(
  input: CreateClientInput
): Promise<ClientRecord> {
  const { rows } = await db.query<ClientRecord>(
    `INSERT INTO clients
       (name, meta, industry, team_size, stage, location, website, logo_url, tags)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [
      input.name,
      input.meta      ?? null,
      input.industry  ?? null,
      input.team_size ?? null,
      input.stage     ?? null,
      input.location  ?? null,
      input.website   ?? null,
      input.logo_url  ?? null,
      JSON.stringify(input.tags),
    ]
  );
  return rows[0];
}

export async function listClients(): Promise<ClientRecord[]> {
  const { rows } = await db.query<ClientRecord>(
    `SELECT * FROM clients ORDER BY created_at DESC`
  );
  return rows;
}

export async function getClientById(id: string): Promise<ClientRecord | null> {
  const { rows } = await db.query<ClientRecord>(
    `SELECT * FROM clients WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function updateClient(
  id: string,
  input: UpdateClientInput
): Promise<ClientRecord | null> {
  const scalarFields = [
    'name', 'meta', 'industry', 'team_size',
    'stage', 'location', 'website', 'logo_url',
  ] as const;

  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const key of scalarFields) {
    if (key in input) {
      fields.push(`${key} = $${idx++}`);
      values.push((input as any)[key] ?? null);
    }
  }

  if ('tags' in input) {
    fields.push(`tags = $${idx++}`);
    values.push(JSON.stringify(input.tags));
  }

  if (!fields.length) return getClientById(id);

  values.push(id);
  const { rows } = await db.query<ClientRecord>(
    `UPDATE clients SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return rows[0] ?? null;
}

export async function deleteClient(id: string): Promise<boolean> {
  const { rowCount } = await db.query(
    `DELETE FROM clients WHERE id = $1`,
    [id]
  );
  return (rowCount ?? 0) > 0;
}

// =============================================
// AUTHOR
// =============================================

export async function createAuthor(
  input: CreateAuthorInput
): Promise<Author> {
  const { rows } = await db.query<Author>(
    `INSERT INTO authors (name, email, role, avatar_url, bio)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [
      input.name,
      input.email,
      input.role       ?? null,
      input.avatar_url ?? null,
      input.bio        ?? null,
    ]
  );
  return rows[0];
}

export async function listAuthors(): Promise<Author[]> {
  const { rows } = await db.query<Author>(
    `SELECT * FROM authors ORDER BY created_at DESC`
  );
  return rows;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const { rows } = await db.query<Author>(
    `SELECT * FROM authors WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function updateAuthor(
  id: string,
  input: UpdateAuthorInput
): Promise<Author | null> {
  const allowed = ['name', 'email', 'role', 'avatar_url', 'bio'] as const;
  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const key of allowed) {
    if (key in input) {
      fields.push(`${key} = $${idx++}`);
      values.push((input as any)[key] ?? null);
    }
  }

  if (!fields.length) return getAuthorById(id);

  values.push(id);
  const { rows } = await db.query<Author>(
    `UPDATE authors SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return rows[0] ?? null;
}

export async function deleteAuthor(id: string): Promise<boolean> {
  const { rowCount } = await db.query(
    `DELETE FROM authors WHERE id = $1`,
    [id]
  );
  return (rowCount ?? 0) > 0;
}

// =============================================
// TAG
// =============================================

export async function createTag(input: CreateTagInput): Promise<Tag> {
  const { rows } = await db.query<Tag>(
    `INSERT INTO tags (name, slug, color_hex)
     VALUES ($1,$2,$3) RETURNING *`,
    [input.name, input.slug, input.color_hex ?? null]
  );
  return rows[0];
}

export async function listTags(): Promise<Tag[]> {
  const { rows } = await db.query<Tag>(
    `SELECT * FROM tags ORDER BY name`
  );
  return rows;
}

export async function deleteTag(id: string): Promise<boolean> {
  const { rowCount } = await db.query(
    `DELETE FROM tags WHERE id = $1`,
    [id]
  );
  return (rowCount ?? 0) > 0;
}