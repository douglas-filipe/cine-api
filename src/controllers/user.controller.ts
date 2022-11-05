import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { createUserService, loginUserService } from "../services/user.services";
import { IResponseError } from "../types/responseError.types";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (e) {
    const error = e as PrismaClientKnownRequestError;
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(400).json({ message: "Error creating account" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const token = await loginUserService({
      email: req.body.email,
      password: req.body.password,
    });

    return res.json(token);
  } catch (e) {
    console.log(e);
    const error = e as IResponseError;
    return res.status(400).json({ message: error.message });
  }
};
