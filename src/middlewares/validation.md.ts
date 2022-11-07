import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IDataPayment } from "../types/payment.types";
import { IDataCreateUser } from "../types/user.types";

interface IErrorsYup {
  errors: [string];
}

export const validation =
  (schema: SchemaOf<IDataCreateUser | IDataPayment>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body;
    try {
      await schema.validate(resource, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (e) {
      res.status(400).json({ error: (e as IErrorsYup).errors.join(", ") });
    }
  };
