import { Router } from 'express';
import controller from '../controllers/sport.controller';

const router = Router();

router.get('/sports/all', controller.getAllSports);
router.get('/sport/:id', controller.getSport);
router.post('/sport', controller.createSport);
router.put('/sport/:id', controller.updateSport);
router.delete('/sport/:id', controller.deleteSport);

export default router;
