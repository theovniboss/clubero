import { Router } from 'express';
import teamController from '../controllers/team.controller';

const router = Router();

router.get('/teams/all', teamController.getAllTeams);
router.get('/teams/', teamController.getTeams);
router.get('/team/:id', (req, res) => teamController.getTeam(req, res));
router.post('/team', teamController.createTeam);
router.put('/team/:id', teamController.updateTeam);
router.delete('/team/:id', teamController.deleteTeam);
router.get('/team/:id/users', teamController.getTeamUsers);
router.get("/user/teams", teamController.getTeamsByUser);
router.post('/team/:id/invite', teamController.inviteTeamUsers);


export default router;
