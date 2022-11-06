import { prisma } from "../services/prisma.service";

interface ICartItems {
  quantity: number;
  ticketId: string;
  orderId: string;
}

export const createOrderRepo = (cartTotal: number, userId: string) => {
  return prisma.orderDetails.create({
    data: { total: cartTotal, userId: userId },
  });
};

export const createManyOrderItemRepo = (cartItems: ICartItems[]) => {
  return prisma.orderItem.createMany({ data: cartItems });
};
