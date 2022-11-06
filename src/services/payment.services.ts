import { ResponseError } from "../errors/response.error";
import { prisma } from "./prisma.service";

export const createPaymentService = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { CartItem: true },
  });
  if (!cart) {
    throw new ResponseError("Cart not found", 404);
  }

  const orderDetails = await prisma.orderDetails.create({
    data: { total: cart.total, userId: cart.userId },
  });

  const cartMap = cart.CartItem.map((e) => {
    return {
      quantity: e.quantity,
      ticketId: e.ticketId,
      orderId: orderDetails.id,
    };
  });

  await prisma.orderItem.createMany({ data: cartMap });
  return { message: "Payment made successfully" };
};

export const listPaymentsInUserService = async (userId: string) => {
  return prisma.orderDetails.findMany({
    where: { userId },
    include: { OrderItem: true },
  });
};
