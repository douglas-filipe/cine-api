import { prisma } from "../services/prisma.service";
import { IDataCreateUser, IDataUpdateUser } from "../types/user.types";

export const createUserRepo = (data: IDataCreateUser) => {
  return prisma.user.create({
    data,
    select: { id: true, email: true, admin: true, name: true },
  });
};

export const getUserByIdRepo = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteUserRepo = (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const updateUserRepo = (id: string, data: IDataUpdateUser) => {
  return prisma.user.update({ where: { id }, data });
};

export const listAllUsersRepo = async () => {
  return prisma.user.findMany({
    select: { id: true, email: true, admin: true, name: true },
  });
};

export const getUserByEmailRepo = (email: string) => {
  return prisma.user.findFirst({ where: { email } });
};
