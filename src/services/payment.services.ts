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
import Stripe from "stripe";
import { IDataPayment } from "../types/payment.types";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-08-01",
});

export const createPaymentService = async (
  data: IDataPayment,
  userId: string
) => {
  const cart = await findCartByUserIdRepo(userId);

  if (!cart) {
    throw new ResponseError("Cart not found", 404);
  }

  if (cart.CartItem.length === 0) {
    throw new ResponseError("Cart empty", 400);
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

  const cardToken = await stripe.tokens.create({
    card: {
      name: data.name,
      number: data.number,
      exp_month: data.month,
      exp_year: data.year,
      cvc: data.cvc,
    },
  });

  const charge = await stripe.charges.create({
    amount: cart.total * 100,
    currency: "brl",
    source: cardToken.id,
    receipt_email: cart.user.email,
    description: data.description,
  });

  if (charge.status === "succeeded") {
    return { message: "Payment made successfully" };
  }

  return { message: "Error payment" };
};

export const listPaymentsInUserService = async (userId: string) => {
  return prisma.orderDetails.findMany({
    where: { userId },
    include: { OrderItem: true },
  });
};
