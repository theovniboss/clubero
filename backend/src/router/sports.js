import express from "express";
import sportsController from "../controllers/sports.js";
const router = express.Router();

router.get("/sports", sportsController.getAllSports);
router.get("/sports/:id", sportsController.getSportById);
router.post("/sports", sportsController.createSport);
router.put("/sports/:id", sportsController.updateSport);
router.delete("/sports/:id", sportsController.deleteSport);

export default router;