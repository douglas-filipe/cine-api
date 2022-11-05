import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/user", createUserController);
userRoutes.post("/login", loginUserController);

export { userRoutes };
