import { Router } from "express";
import {
  createTicketController,
  deleteTicketController,
  listAllTicketsController,
  updateTicketController,
} from "../controllers/ticket.controller";
import { verifyTokenAdminMd, verifyTokenMd } from "../middlewares/user.md";

const ticketRoutes = Router();

ticketRoutes.post(
  "/ticket",
  verifyTokenMd,
  verifyTokenAdminMd,
  createTicketController
);

ticketRoutes.get("/tickets", listAllTicketsController);

ticketRoutes.patch(
  "/ticket/:id",
  verifyTokenMd,
  verifyTokenAdminMd,
  updateTicketController
);

ticketRoutes.delete(
  "/ticket/:id",
  verifyTokenMd,
  verifyTokenAdminMd,
  deleteTicketController
);

export { ticketRoutes };
