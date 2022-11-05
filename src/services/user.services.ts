import {
  createUserRepo,
  getUserByEmailRepo,
  IDataInput,
} from "../repositories/user.repositories";
import { ResponseError } from "../errors/response.error";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ILoginRequest } from "../types/user.types";

export const createUserService = async (body: IDataInput) => {
  const { password } = body;
  body.password = bcrypt.hashSync(password, 10);
  const user = await createUserRepo(body);
  return user;
};

export const loginUserService = async (data: ILoginRequest) => {
  const { email, password } = data;

  const user = await getUserByEmailRepo(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new ResponseError("Incorrect email or password", 401);
  } else {
    const token = jwt.sign(
      { id: user.id, admin: user.admin },
      process.env.SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return { token };
  }
};
