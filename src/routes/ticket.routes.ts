import { Router } from "express";
import {
  createTicketController,
  listAllTicketsController,
} from "../controllers/ticket.controller";

const ticketRoutes = Router();

ticketRoutes.post("/ticket", createTicketController);
ticketRoutes.get("/tickets", listAllTicketsController);

export { ticketRoutes };
