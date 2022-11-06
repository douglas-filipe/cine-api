import { NextFunction, Request, Response } from "express";
import { IDecoded } from "../types/user.types";
import jwt from "jsonwebtoken";

export const verifyTokenMd = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization headers" });
  }

  const decoded = jwt.verify(token, process.env.SECRET as string) as IDecoded;

  if (!decoded) {
    return res.status(401).json({ message: "invalid token" });
  }

  req.userId = decoded.id;
  req.admin = decoded.admin;

  next();
};

export const verifyTokenAdminMd = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.admin) {
    return res.status(401).json({ message: "You are not an admin user" });
  }

  next();
};
