import express from "express";
import clubController from "../controllers/club.controller";
const clubRouter = express.Router();

clubRouter.get("/clubs/all", clubController.getAllClubs);
clubRouter.get("/clubs", clubController.getClubs);
clubRouter.get("/club/:id", clubController.getClub);
clubRouter.post("/club", clubController.createClub);
clubRouter.put("/club/:id", clubController.updateClub);
clubRouter.delete("/club/:id", clubController.deleteClub);



export default clubRouter;