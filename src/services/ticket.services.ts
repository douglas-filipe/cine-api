import {
  createTicketRepo,
  listAllTicketsRepo,
} from "../repositories/ticket.repositories";
import { IDataTicketInput } from "../types/ticket.types";

export const createTicketService = (data: IDataTicketInput) => {
  return createTicketRepo(data);
};

export const listAllTicketsService = (page: number) => {
  return listAllTicketsRepo(page);
};
