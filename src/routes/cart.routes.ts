import { Router } from "express";
import {
  addTicketToCartController,
  decrementCartItemInCartController,
  deleteCartItemController,
  listTicketsInCartController,
} from "../controllers/cart.controllers";
import { verifyTokenMd } from "../middlewares/user.md";

const cartRoutes = Router();

cartRoutes.post("/cart", verifyTokenMd, addTicketToCartController);
cartRoutes.get("/cart", verifyTokenMd, listTicketsInCartController);
cartRoutes.delete("/cart/:cartItemId", verifyTokenMd, deleteCartItemController);
cartRoutes.patch(
  "/cart/:cartItemId",
  verifyTokenMd,
  decrementCartItemInCartController
);

export { cartRoutes };
