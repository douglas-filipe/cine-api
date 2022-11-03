import { Router } from "express";
import {
  addTicketToCartController,
  listTicketsInCartController,
} from "../controllers/cart.controllers";

const cartRoutes = Router();

cartRoutes.post("/cart", addTicketToCartController);
cartRoutes.get("/cart/:userId", listTicketsInCartController);

export { cartRoutes };
