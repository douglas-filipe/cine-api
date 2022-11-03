import { prisma } from "../services/prisma.service";

export const findCartUserRepo = (userId: string) => {
  return prisma.cart.findFirst({ where: { userId: userId } });
};

export const listTicketsInCartRepo = async (userId: string) => {
  return prisma.cart.findFirst({
    where: { userId: userId },
    include: { CartItem: { include: { ticket: true } } },
  });
};

export const createCartRepo = async (
  userId: string,
  price: number,
  ticketId: string
) => {
  const cart = await prisma.cart.create({
    data: { total: price, userId },
  });
  return prisma.cartItem.create({
    data: { cartId: cart.id, ticketId, quantity: 1 },
  });
};

export const findCartItemFromUserIdAndCartIdRepo = (
  ticketId: string,
  cartId: string
) => {
  return prisma.cartItem.findFirst({
    where: { ticketId, cartId },
  });
};

export const updateCartAndCartItemRepo = async (
  ticketId: string,
  quantity: number,
  cartId: string,
  total: number,
  price: number
) => {
  await prisma.cartItem.update({
    where: { id: ticketId },
    data: { quantity: (quantity += 1) },
  });
  return prisma.cart.update({
    where: { id: cartId },
    data: { total: (total += price) },
  });
};

export const createCartItemRepo = (cartId: string, ticketId: string) => {
  return prisma.cartItem.create({
    data: { cartId, ticketId, quantity: 1 },
  });
};

export const updateCartRepo = (
  cartId: string,
  total: number,
  price: number
) => {
  return prisma.cart.update({
    where: { id: cartId },
    data: { total: (total += price) },
  });
};
