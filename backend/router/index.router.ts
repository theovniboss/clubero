import express from "express";
import clubRouter from "./club.router";
import userRouter from "./user.router"

const router = express.Router();

router.use(userRouter);
router.use(clubRouter);
// router.use(sportsRouter);
// router.use(teamsRouter);



export default router;