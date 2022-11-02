import { prisma } from "../services/prisma.service";

export interface IDataInput {
  email: string;
  password: string;
  admin?: boolean;
  name: string;
}

export const createUserRepo = (data: IDataInput) => {
  return prisma.user.create({
    data,
    select: { id: true, email: true, admin: true, name: true },
  });
};

export const getUserByIdRepo = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const deleteUserRepo = (id: string) => {
  return prisma.user.delete({ where: { id } });
};

export const updateUserRepo = (id: string, data: IDataInput) => {
  return prisma.user.update({ where: { id }, data });
};

export const listAllUsersRepo = async () => {
  return prisma.user.findMany({
    select: { id: true, email: true, admin: true, name: true },
  });
};
