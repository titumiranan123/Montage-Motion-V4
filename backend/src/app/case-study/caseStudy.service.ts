/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '../../db/db';
import { seoMetaService } from '../seo/seo.service';
import { CaseStudy } from './caseStudy.type';
import { CreateCaseStudyInput, UpdateCaseStudyInput, ListQueryInput } from './caseStudy.zod';

export async function createCaseStudy(input: CreateCaseStudyInput): Promise<CaseStudy> {
  const { rows } = await db.query<CaseStudy>(
    `INSERT INTO case_studies (
       slug, type, status,
       title, description,
       image_url, image_alt,
       client_name, client_logo, client_industry, client_domain, client_employees, client_desc,
       challenge_intro, solution_intro, outcome_desc, outcome_video,
       meta_title, meta_desc, meta_keywords, calendly_url,
       tag_slugs, client_tags,
       hero_stats, metrics, challenge_items, solution_phases, testimonials
     ) VALUES (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
       $11,$12,$13,$14,$15,$16,$17,$18,$19,
       $20,$21,$22,$23,$24,$25,$26,$27,$28
     ) RETURNING *`,
    [
      input.slug, input.type ?? null, input.status,
      input.title    ?? null,

      input.description     ?? null,
      input.image_url       ?? null,
      input.image_alt       ?? null,
      input.client_name     ?? null,
      input.client_logo     ?? null,
      input.client_industry ?? null,
      input.client_domain   ?? null,
      input.client_employees?? null,
      input.client_desc     ?? null,
      input.challenge_intro ?? null,
      input.solution_intro  ?? null,
      input.outcome_desc    ?? null,
      input.outcome_video   ?? null,
      input.meta_title      ?? null,
      input.meta_desc       ?? null,
      input.meta_keywords   ?? null,
      input.calendly_url    ?? null,
      input.tag_slugs,
      input.client_tags,
      JSON.stringify(input.hero_stats),
      JSON.stringify(input.metrics),
      JSON.stringify(input.challenge_items),
      JSON.stringify(input.solution_phases),
      JSON.stringify(input.testimonials),
    ]
  );
  return rows[0];
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const { rows } = await db.query<CaseStudy>(
    `SELECT * FROM case_studies WHERE id = $1`, [id]
  );
  return rows[0] ?? null;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const { rows } = await db.query<CaseStudy>(
    `SELECT * FROM case_studies WHERE slug = $1`, [slug]
  );
  return rows[0] ?? null;
}

export async function listCaseStudies(query: ListQueryInput) {
  const conditions: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (query.type)   { conditions.push(`type = $${idx++}`);           values.push(query.type); }
  if (query.status) { conditions.push(`status = $${idx++}`);         values.push(query.status); }
  if (query.tag)    { conditions.push(`$${idx++} = ANY(tag_slugs)`); values.push(query.tag); }
  if (query.search) {
    conditions.push(`(title ILIKE $${idx} OR description ILIKE $${idx})`);
    values.push(`%${query.search}%`);
    idx++;
  }

  const where  = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (query.page - 1) * query.limit;

  const [countRes, { rows }] = await Promise.all([
    db.query(`SELECT COUNT(*) FROM case_studies ${where}`, values),
    db.query(
      `SELECT id, slug, type, status,
              title,
              description, image_url, image_alt,
              tag_slugs, hero_stats, metrics, created_at
       FROM case_studies ${where}
       ORDER BY created_at DESC
       LIMIT $${idx++} OFFSET $${idx++}`,
      [...values, query.limit, offset]
    ),
  ]);

  const total = Number(countRes.rows[0].count)
      const seo = await seoMetaService.getSchema("case-studies");
  return {
    data:  rows,
    total,
    schema: seo?.schema,
    page:  query.page,
    limit: query.limit,
    pages: Math.ceil(total / query.limit),
  };
}

export async function updateCaseStudy(id: string, input: UpdateCaseStudyInput): Promise<CaseStudy | null> {
  const scalars = [
    'slug','type','status',
    'title','description',
    'image_url','image_alt',
    'client_name','client_logo','client_industry','client_domain','client_employees','client_desc',
    'challenge_intro','solution_intro','outcome_desc','outcome_video',
    'meta_title','meta_desc','meta_keywords','calendly_url',
  ] as const;

  const jsons  = ['hero_stats','metrics','challenge_items','solution_phases','testimonials'] as const;
  const arrays = ['tag_slugs','client_tags'] as const;

  const fields: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  for (const k of scalars) if (k in input) { fields.push(`${k} = $${idx++}`); values.push((input as any)[k] ?? null); }
  for (const k of jsons)   if (k in input) { fields.push(`${k} = $${idx++}`); values.push(JSON.stringify((input as any)[k])); }
  for (const k of arrays)  if (k in input) { fields.push(`${k} = $${idx++}`); values.push((input as any)[k]); }

  if (!fields.length) return getCaseStudyById(id);

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const { rowCount } = await db.query(
    `UPDATE case_studies SET ${fields.join(', ')} WHERE id = $${idx}`, values
  );
 
  if (!rowCount) return null;
  return getCaseStudyById(id);
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  const { rowCount } = await db.query(`DELETE FROM case_studies WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

export async function publishCaseStudy(id: string): Promise<CaseStudy | null> {
  const { rows } = await db.query<CaseStudy>(
    `UPDATE case_studies SET status = 'published', updated_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0] ?? null;
}