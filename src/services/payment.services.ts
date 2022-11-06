import { ResponseError } from "../errors/response.error";
import {
  deleteManyCartItemRepo,
  findCartByUserIdRepo,
  updateCartRepo,
} from "../repositories/cart.repositories";
import {
  createManyOrderItemRepo,
  createOrderRepo,
} from "../repositories/order.repositories";
import { prisma } from "./prisma.service";

export const createPaymentService = async (userId: string) => {
  const cart = await findCartByUserIdRepo(userId);

  if (!cart) {
    throw new ResponseError("Cart not found", 404);
  }

  const orderDetails = await createOrderRepo(cart.total, cart.userId);

  const cartMap = cart.CartItem.map((e) => {
    return {
      quantity: e.quantity,
      ticketId: e.ticketId,
      orderId: orderDetails.id,
    };
  });

  await createManyOrderItemRepo(cartMap);

  await updateCartRepo(cart.id, 0);

  await deleteManyCartItemRepo(cart.id);

  return { message: "Payment made successfully" };
};

export const listPaymentsInUserService = async (userId: string) => {
  return prisma.orderDetails.findMany({
    where: { userId },
    include: { OrderItem: true },
  });
};
