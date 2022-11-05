import {
  createTicketRepo,
  deleteTicketRepo,
  listAllTicketsRepo,
  updateTicketRepo,
} from "../repositories/ticket.repositories";
import {
  IDataTicketInput,
  IDataTicketUpdateInput,
} from "../types/ticket.types";

export const createTicketService = (data: IDataTicketInput) => {
  return createTicketRepo(data);
};

export const listAllTicketsService = (page: number) => {
  return listAllTicketsRepo(page);
};

export const deleteTicketService = (id: string) => {
  return deleteTicketRepo(id);
};

export const updateTicketService = (
  id: string,
  data: IDataTicketUpdateInput
) => {
  return updateTicketRepo(id, data);
};
