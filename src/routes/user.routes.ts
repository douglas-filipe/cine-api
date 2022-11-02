import { Router } from "express";
import { createUserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/user", createUserController);

export { userRoutes };
