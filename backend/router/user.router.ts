import express from "express";
import usersController from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/user", usersController.getUser);
// router.get("/users/:id", usersController.getUserById);
// router.post("/users", usersController.createUser);
userRouter.put("/user", usersController.updateUser);
// router.delete("/users/:id", usersController.deleteUser);



export default userRouter;