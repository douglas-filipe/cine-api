import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  loginUserController,
  updateUserController,
} from "../controllers/user.controller";
import { verifyTokenMd } from "../middlewares/user.md";

const userRoutes = Router();

userRoutes.post("/user", createUserController);
userRoutes.post("/login", loginUserController);
userRoutes.patch("/user", verifyTokenMd, updateUserController);
userRoutes.delete("/user", verifyTokenMd, deleteUserController);
userRoutes.get("/user-details", verifyTokenMd, getUserByIdController);

export { userRoutes };
