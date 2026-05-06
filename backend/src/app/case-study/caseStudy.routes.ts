import { Router } from 'express';
import * as ctrl from './caseStudy.controller';

const router = Router();

router.get('/',              ctrl.list);
router.get('/:id',           ctrl.getById);
router.get('/slug/:slug',    ctrl.getBySlug);
router.post('/',             ctrl.create);
router.patch('/:id',         ctrl.update);
router.patch('/:id/publish', ctrl.publish);
router.delete('/:id',        ctrl.remove);

export default router;