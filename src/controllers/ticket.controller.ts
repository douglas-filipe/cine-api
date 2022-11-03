import { Request, Response } from "express";
import {
  createTicketService,
  listAllTicketsService,
} from "../services/ticket.services";

export const createTicketController = async (req: Request, res: Response) => {
  const ticket = await createTicketService(req.body);
  return res.status(201).json(ticket);
};

export const listAllTicketsController = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const tickets = await listAllTicketsService(page || 1);
  return res.json(tickets);
};
