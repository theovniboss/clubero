import express from "express";
import clubRouter from "./club.router";
import userRouter from "./user.router"
import teamRouter from "./team.router";
import sportRouter from "./sport.router";
import cashFlowRouter from "./cashFlow.router";
import eventRouter from "./event.router";

const router = express.Router();

router.use(userRouter);
router.use(clubRouter);
router.use(teamRouter);
router.use(sportRouter);
router.use(cashFlowRouter);
router.use(eventRouter);



export default router;