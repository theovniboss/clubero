import express from "express";
import teamsController from "../controllers/teams.js";
const router = express.Router();

router.get("/teams", teamsController.getAllTeams);
router.get("/teams/:id", teamsController.getTeamById);
router.post("/teams", teamsController.createTeam);
router.put("/teams/:id", teamsController.updateTeam);
router.delete("/teams/:id", teamsController.deleteTeam);

export default router;