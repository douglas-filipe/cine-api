import {
  createCartItemRepo,
  createCartRepo,
  deleteCartItemRepo,
  findAllCartItemInCart,
  findCartItemByIdRepo,
  findCartItemFromUserIdAndCartIdRepo,
  findCartUserRepo,
  listTicketsInCartRepo,
  updateCartAndCartItemRepo,
  updateCartItemRepo,
  updateCartRepo,
} from "../repositories/cart.repositories";
import {
  readyByIdTicketRepo,
  updateTicketRepo,
} from "../repositories/ticket.repositories";
import { getUserByIdRepo } from "../repositories/user.repositories";
import { ResponseError } from "../errors/response.error";

export const addTicketToCartService = async (
  ticketId: string,
  userId: string
) => {
  const user = await getUserByIdRepo(userId);
  const cart = await findCartUserRepo(userId);
  const ticket = await readyByIdTicketRepo(ticketId);

  if (!user) {
    throw new ResponseError("User not found", 404);
  }

  if (!ticket) {
    throw new ResponseError("Ticket not found", 404);
  }

  if (ticket.quantity === 0) {
    throw new ResponseError("Ticket sold out", 400);
  }

  if (!cart) {
    await updateTicketRepo(ticket.id, { quantity: (ticket.quantity -= 1) });
    return createCartRepo(userId, ticket.price, ticket.id);
  }

  const ticketExistsInCart = await findCartItemFromUserIdAndCartIdRepo(
    ticketId,
    cart.id
  );
  const totalCart = cart.total + ticket.price;

  if (ticketExistsInCart) {
    await updateTicketRepo(ticket.id, { quantity: (ticket.quantity -= 1) });

    const cartItem = await updateCartAndCartItemRepo(
      ticketExistsInCart.id,
      (ticketExistsInCart.quantity += 1),
      cart.id,
      totalCart
    );
    return { cartItem, total: totalCart };
  }

  await updateTicketRepo(ticket.id, { quantity: (ticket.quantity -= 1) });

  const cartTotal = await updateCartRepo(cart.id, totalCart);

  const cartItem = await createCartItemRepo(cart.id, ticketId);

  return { cartItem, total: cartTotal };
};

export const listTicketsInCartService = (userId: string) => {
  return listTicketsInCartRepo(userId);
};

export const deleteCartItemService = async (
  cartItemId: string,
  userId: string
) => {
  const cart = await findCartUserRepo(userId);

  if (!cart) {
    throw new ResponseError("Cart not found", 404);
  }

  const cartItem = await findCartItemByIdRepo(cartItemId);

  if (!cartItem) {
    throw new ResponseError("CartItem not found", 404);
  }

  const totalCart = cart.total - cartItem.ticket.price * cartItem.quantity;

  await updateCartRepo(cart.id, totalCart);

  await updateTicketRepo(cartItem.ticket.id, {
    quantity: cartItem.ticket.quantity + cartItem.quantity,
  });

  return deleteCartItemRepo(cartItemId);
};

export const decrementCartItemInCartService = async (
  cartItemId: string,
  userId: string
) => {
  const cartItem = await findCartItemByIdRepo(cartItemId);

  if (!cartItem) {
    throw new ResponseError("CartItem not found", 404);
  }

  const totalCart = cartItem.cart.total - cartItem.ticket.price;

  await updateCartItemRepo(cartItem.id, cartItem.quantity - 1);

  const findNewCartItem = await findCartItemByIdRepo(cartItemId);

  if (findNewCartItem?.quantity === 0) {
    await deleteCartItemRepo(cartItemId);
  }

  const verifyTotal = await findAllCartItemInCart(userId);

  await updateCartRepo(
    cartItem.cart.id,
    verifyTotal._count === 0 ? 0 : totalCart
  );

  return await updateTicketRepo(cartItem.ticket.id, {
    quantity: (cartItem.ticket.quantity += 1),
  });
};
