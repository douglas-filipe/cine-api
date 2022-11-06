import { Router } from "express";
import { listAllUsersController } from "../controllers/admin.controller";
import { verifyTokenAdminMd, verifyTokenMd } from "../middlewares/user.md";

const adminRoutes = Router();

adminRoutes.get(
  "/users",
  verifyTokenMd,
  verifyTokenAdminMd,
  listAllUsersController
);

export { adminRoutes };
