import express from "express";
import userController from "../controllers/user.controller";
const userRouter = express.Router();


userRouter.get("/user", userController.getUser);
// router.get("/users/:id", usersController.getUserById);
userRouter.post("/user", userController.createUser);
userRouter.put("/user", userController.updateUser);
userRouter.post("/user/password", userController.changePasswordUser);
// router.delete("/users/:id", usersController.deleteUser);



export default userRouter; 