import { Router } from "express";
import { listAllUsersController } from "../controllers/admin.controller";

const adminRoutes = Router();

adminRoutes.get("/users", listAllUsersController);

export { adminRoutes };
