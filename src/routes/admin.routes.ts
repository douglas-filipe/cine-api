import { Router } from "express";
import { listAllUsersController } from "../controllers/admin.controller";
import { verifyTokenMd } from "../middlewares/user.md";

const adminRoutes = Router();

adminRoutes.get("/users", verifyTokenMd, listAllUsersController);

export { adminRoutes };
