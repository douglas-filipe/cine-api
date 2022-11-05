import { Router } from "express";
import {
  createTicketController,
  listAllTicketsController,
} from "../controllers/ticket.controller";
import { verifyTokenAdminMd } from "../middlewares/user.md";

const ticketRoutes = Router();

ticketRoutes.post("/ticket", verifyTokenAdminMd, createTicketController);
ticketRoutes.get("/tickets", listAllTicketsController);

export { ticketRoutes };
