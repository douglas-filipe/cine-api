import { Request, Response } from "express";
import { listAllUsersService } from "../services/admin.controller";

export const listAllUsersController = async (__: Request, res: Response) => {
  const users = await listAllUsersService();
  return res.json(users);
};
