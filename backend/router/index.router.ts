import express from "express";
import clubRouter from "./club.router";
import userRouter from "./user.router"
import teamRouter from "./team.router";
import sportRouter from "./sport.router";

const router = express.Router();

router.use(userRouter);
router.use(clubRouter);
router.use(teamRouter);
router.use(sportRouter);



export default router;