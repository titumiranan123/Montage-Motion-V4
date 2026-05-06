import { Request, Response, NextFunction } from 'express';
import * as svc from './caseStudy.service';
import {
  createCaseStudySchema, updateCaseStudySchema,
  listQuerySchema, uuidParamSchema, slugParamSchema,
} from './caseStudy.zod';

const ok   = (res: Response, data: unknown, status = 200) =>
  res.status(status).json({ success: true, data });
const fail = (res: Response, message: unknown, status = 400) =>
  res.status(status).json({ success: false, message });

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createCaseStudySchema.safeParse(req.body);
    if (!parsed.success) return fail(res, parsed.error.flatten().fieldErrors);
    const exists = await svc.getCaseStudyBySlug(parsed.data.slug);
    if (exists) return fail(res, 'Slug already in use', 409);
    return ok(res, await svc.createCaseStudy(parsed.data), 201);
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) return fail(res, parsed.error.flatten().fieldErrors);
    return ok(res, await svc.listCaseStudies(parsed.data));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) return fail(res, 'Invalid UUID', 400);
    const cs = await svc.getCaseStudyById(parsed.data.id);
    if (!cs) return fail(res, 'Not found', 404);
    return ok(res, cs);
  } catch (err) { next(err); }
}

export async function getBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = slugParamSchema.safeParse(req.params);
    if (!parsed.success) return fail(res, 'Invalid slug', 400);
    const cs = await svc.getCaseStudyBySlug(parsed.data.slug);
    if (!cs) return fail(res, 'Not found', 404);
    return ok(res, cs);
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const param = uuidParamSchema.safeParse(req.params);
    if (!param.success) return fail(res, 'Invalid UUID', 400);
    const body = updateCaseStudySchema.safeParse(req.body);
    if (!body.success) return fail(res, body.error.flatten().fieldErrors);
    if (body.data.slug) {
      const exists = await svc.getCaseStudyBySlug(body.data.slug);
      if (exists && exists.id !== param.data.id) return fail(res, 'Slug already in use', 409);
    }
    const cs = await svc.updateCaseStudy(param.data.id, body.data);
    if (!cs) return fail(res, 'Not found', 404);
    return ok(res, cs);
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) return fail(res, 'Invalid UUID', 400);
    const deleted = await svc.deleteCaseStudy(parsed.data.id);
    if (!deleted) return fail(res, 'Not found', 404);
    return ok(res, { deleted: true });
  } catch (err) { next(err); }
}

export async function publish(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) return fail(res, 'Invalid UUID', 400);
    const cs = await svc.publishCaseStudy(parsed.data.id);
    if (!cs) return fail(res, 'Not found', 404);
    return ok(res, cs);
  } catch (err) { next(err); }
}