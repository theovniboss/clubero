import express from "express";
import clubsController from "../controllers/clubs.js";
const router = express.Router();

router.get("/clubs", clubsController.getAllClubs);
router.get("/clubs/:id", clubsController.getClubById);
router.post("/clubs", clubsController.createClub);
router.put("/clubs/:id", clubsController.updateClub);
router.delete("/clubs/:id", clubsController.deleteClub);



export default router;