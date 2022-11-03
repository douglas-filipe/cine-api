import {
  createCartItemRepo,
  createCartRepo,
  findCartItemFromUserIdAndCartIdRepo,
  findCartUserRepo,
  listTicketsInCartRepo,
  updateCartAndCartItemRepo,
  updateCartRepo,
} from "../repositories/cart.repository";
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

  if (!cart) {
    return createCartRepo(userId, ticket.price, ticket.id);
  }

  if (ticket.quantity === 0) {
    throw new ResponseError("Ticket sold out", 400);
  }

  const ticketExistsInCart = await findCartItemFromUserIdAndCartIdRepo(
    ticketId,
    cart.id
  );

  if (ticketExistsInCart) {
    if (ticket.quantity > 0) {
      await updateTicketRepo(ticket.id, { quantity: (ticket.quantity -= 1) });
    }
    return updateCartAndCartItemRepo(
      ticketExistsInCart.id,
      ticketExistsInCart.quantity,
      cart.id,
      cart.total,
      ticket.price
    );
  }

  await createCartItemRepo(cart.id, ticketId);

  await updateTicketRepo(ticket.id, { quantity: (ticket.quantity -= 1) });

  return updateCartRepo(cart.id, cart.total, ticket.price);
};

export const listTicketsInCartService = (userId: string) => {
  return listTicketsInCartRepo(userId);
};
