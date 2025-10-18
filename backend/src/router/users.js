import express from "express";
import usersController from "../controllers/users.js";
const router = express.Router();

router.get("/user", usersController.getUser);
// router.get("/users/:id", usersController.getUserById);
// router.post("/users", usersController.createUser);
router.put("/user", usersController.updateUser);
// router.delete("/users/:id", usersController.deleteUser);



export default router;