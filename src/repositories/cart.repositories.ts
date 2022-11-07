import { prisma } from "../services/prisma.service";

export const findCartUserRepo = (userId: string) => {
  return prisma.cart.findFirst({
    where: { userId: userId },
    include: { CartItem: true },
  });
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
  totalCart: number
) => {
  const cartItem = await prisma.cartItem.update({
    where: { id: ticketId },
    data: { quantity },
  });
  await prisma.cart.update({
    where: { id: cartId },
    data: { total: totalCart },
  });
  return cartItem;
};

export const createCartItemRepo = (cartId: string, ticketId: string) => {
  return prisma.cartItem.create({
    data: { cartId, ticketId, quantity: 1 },
  });
};

export const updateCartRepo = async (cartId: string, total: number) => {
  await prisma.cart.update({
    where: { id: cartId },
    data: { total: total },
  });
  return total;
};

export const decrementCartItemInCartRepo = async (
  id: string,
  quantity: number,
  ticketId: string,
  cartId: string,
  total: number,
  price: number,
  cartItemId: string
) => {
  if (quantity === 0) {
    const cartItem = await prisma.cartItem.update({
      where: { id: ticketId },
      data: { quantity: (quantity -= 1) },
    });
    await prisma.cart.update({
      where: { id: cartId },
      data: { total: (total -= price) },
    });
    return cartItem;
  }

  return deleteCartItemRepo(cartItemId);
};

export const deleteCartItemRepo = (id: string) => {
  return prisma.cartItem.delete({ where: { id } });
};

export const findCartItemByIdRepo = (id: string) => {
  return prisma.cartItem.findFirst({
    where: { id },
    include: { ticket: true, cart: true },
  });
};

export const updateCartItemRepo = (id: string, quantity: number) => {
  return prisma.cartItem.update({
    where: { id },
    data: {
      quantity,
    },
  });
};

export const findAllCartItemInCart = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: { userId },
  });
  return prisma.cartItem.aggregate({
    where: { cartId: cart?.id },
    _count: true,
  });
};

export const findCartByUserIdRepo = (userId: string) => {
  return prisma.cart.findFirst({
    where: { userId },
    include: { CartItem: true, user: true },
  });
};

export const deleteManyCartItemRepo = (cartId: string) => {
  return prisma.cartItem.deleteMany({ where: { cartId } });
};
