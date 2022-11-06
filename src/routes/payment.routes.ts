import { Router } from "express";
import {
  createPaymentController,
  listPaymentsInUserController,
} from "../controllers/payment.controller";
import { verifyTokenMd } from "../middlewares/user.md";

const paymentRoutes = Router();

paymentRoutes.post("/payment", verifyTokenMd, createPaymentController);
paymentRoutes.get("/payments", verifyTokenMd, listPaymentsInUserController);

export { paymentRoutes };
