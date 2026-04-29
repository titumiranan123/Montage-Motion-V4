// =============================================
// routes/caseStudy.routes.ts
// =============================================
import { Router } from 'express';
import * as ctrl from './caseStudy.controller';

const caseRoute = Router();
//  auth("ADMIN", "MODARATOR"),
// case studies
caseRoute.get('/',                  ctrl.list);
caseRoute.post('/',                 ctrl.create);
caseRoute.get('/slug/:slug',        ctrl.getBySlug);
caseRoute.get('/:id',               ctrl.getById);
caseRoute.patch('/:id',             ctrl.update);
caseRoute.delete('/:id',            ctrl.remove);
caseRoute.patch('/:id/publish',     ctrl.publish);

// clients
caseRoute.get('/clients',           ctrl.listClients);
caseRoute.post('/clients',          ctrl.createClient);
caseRoute.get('/clients/:id',       ctrl.getClient);
caseRoute.patch('/clients/:id',     ctrl.updateClient);
caseRoute.delete('/clients/:id',    ctrl.deleteClient);

// authors
caseRoute.get('/authors',           ctrl.listAuthors);
caseRoute.post('/authors',          ctrl.createAuthor);
caseRoute.patch('/authors/:id',     ctrl.updateAuthor);
caseRoute.delete('/authors/:id',    ctrl.deleteAuthor);

// tags
caseRoute.get('/tags',              ctrl.listTags);
caseRoute.post('/tags',             ctrl.createTag);
caseRoute.delete('/tags/:id',       ctrl.deleteTag);

export default caseRoute;