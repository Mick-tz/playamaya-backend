import { Router, Request, Response } from 'express';
import { indexController } from '../controllers/indexController';
const router = Router();

router.get('/', indexController.index);
router.get('/acerca', indexController.about);
router.get('/api', indexController.docs);

module.exports = router;