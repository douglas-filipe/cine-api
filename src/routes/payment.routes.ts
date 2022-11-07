import { Router } from "express";
import {
  createPaymentController,
  listPaymentsInUserController,
} from "../controllers/payment.controller";
import { verifyTokenMd } from "../middlewares/user.md";
import { validation } from "../middlewares/validation.md";
import { createPaymentSchema } from "../schemas/payment.schemas";

const paymentRoutes = Router();

paymentRoutes.post(
  "/payment",
  verifyTokenMd,
  validation(createPaymentSchema),
  createPaymentController
);
paymentRoutes.get("/payments", verifyTokenMd, listPaymentsInUserController);

export { paymentRoutes };
