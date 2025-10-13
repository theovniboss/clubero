import express from "express";
import userRouter from "./users.js";
import clubRouter from "./clubs.js";
import sportsRouter from "./sports.js";
import teamsRouter from "./teams.js";

const router = express.Router();

router.use(userRouter);
router.use(clubRouter);
router.use(sportsRouter);
router.use(teamsRouter);



export default router;