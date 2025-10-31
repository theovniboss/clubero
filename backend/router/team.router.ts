import { Router } from 'express';
import controller from '../controllers/team.controller';

const router = Router();

router.get('/teams/all', controller.getAllTeams);
router.get('/teams/', controller.getTeams);
router.get('/team/:id', controller.getTeam);
router.post('/team', controller.createTeam);
router.put('/team/:id', controller.updateTeam);
router.delete('/team/:id', controller.deleteTeam);

export default router;
