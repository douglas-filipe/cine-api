import { Request, Response } from "express";
import {
  createPaymentService,
  listPaymentsInUserService,
} from "../services/payment.services";
import { IResponseError } from "../types/responseError.types";

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const payment = await createPaymentService(req.body, req.userId as string);
    return res.status(201).json(payment);
  } catch (e) {
    const error = e as IResponseError;
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

export const listPaymentsInUserController = async (
  req: Request,
  res: Response
) => {
  const payments = await listPaymentsInUserService(req.userId as string);
  return res.json(payments);
};
