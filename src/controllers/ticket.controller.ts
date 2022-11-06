import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import {
  createTicketService,
  deleteTicketService,
  listAllTicketsService,
  updateTicketService,
} from "../services/ticket.services";
import { IResponseError } from "../types/responseError.types";

export const createTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await createTicketService(req.body);
    return res.status(201).json(ticket);
  } catch (e) {
    const error = e as IResponseError;
    return res.status(400).json({ message: error.message });
  }
};

export const listAllTicketsController = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query.page as string);
  const tickets = await listAllTicketsService(page || 1);
  return res.json(tickets);
};

export const updateTicketController = async (req: Request, res: Response) => {
  try {
    await updateTicketService(req.params.id, req.body);
    return res.status(204).json();
  } catch (e) {
    const error = e as PrismaClientKnownRequestError;
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Ticket not exists" });
    }
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTicketController = async (req: Request, res: Response) => {
  try {
    await deleteTicketService(req.params.id);
    return res.status(204).json();
  } catch (e) {
    const error = e as PrismaClientKnownRequestError;
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Ticket not exists" });
    }
    return res.status(400).json({ message: error.message });
  }
};
