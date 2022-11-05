import { Request, Response } from "express";
import {
  addTicketToCartService,
  decrementCartItemInCartService,
  deleteCartItemService,
  listTicketsInCartService,
} from "../services/cart.services";
import { IResponseError } from "../types/responseError.types";

export const addTicketToCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req;
    const { ticketId } = req.body;
    if (!ticketId || !userId) {
      return res
        .status(400)
        .json({ message: "ticketId ou userId não foram inseridos" });
    }
    const cart = await addTicketToCartService(ticketId, userId);
    return res.status(201).json(cart);
  } catch (e) {
    const error = e as IResponseError;
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error" });
  }
};

export const listTicketsInCartController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req;
  if (!userId) {
    return res.status(400).json({ message: "userId não foi inserido" });
  }
  const cart = await listTicketsInCartService(userId);

  return res.status(200).json(cart || []);
};

export const deleteCartItemController = async (req: Request, res: Response) => {
  try {
    await deleteCartItemService(req.params.cartItemId, req.userId as string);
    return res.status(204).json();
  } catch (e) {
    const error = e as IResponseError;
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error" });
  }
};

export const decrementCartItemInCartController = async (
  req: Request,
  res: Response
) => {
  try {
    await decrementCartItemInCartService(
      req.params.cartItemId,
      req.userId as string
    );
    return res.status(204).json();
  } catch (e) {
    const error = e as IResponseError;
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(400).json({ message: "Error" });
  }
};
