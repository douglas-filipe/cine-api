import { prisma } from "../services/prisma.service";
import {
  IDataTicketInput,
  IDataTicketUpdateInput,
} from "../types/ticket.types";

export const createTicketRepo = (data: IDataTicketInput) => {
  return prisma.ticket.create({ data });
};

export const listAllTicketsRepo = async (page: number) => {
  const totalCount = await prisma.ticket.aggregate({
    where: { quantity: { gt: 1 } },
    _count: true,
  });

  const totalPage = Math.ceil(totalCount._count / 10);
  const tickets = await prisma.ticket.findMany({
    take: 10,
    skip: 10 * (page - 1),
    orderBy: { createdAt: "desc" },
    where: { quantity: { gt: 0 } },
  });

  return {
    totalCount: totalCount._count,
    totalPage,
    currentPage: page,
    tickets,
  };
};

export const readyByIdTicketRepo = (id: string) => {
  return prisma.ticket.findFirst({ where: { id } });
};

export const deleteTicketRepo = (id: string) => {
  return prisma.ticket.delete({ where: { id } });
};

export const updateTicketRepo = (id: string, data: IDataTicketUpdateInput) => {
  return prisma.ticket.update({ where: { id }, data });
};
