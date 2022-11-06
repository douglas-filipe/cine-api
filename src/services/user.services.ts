import {
  createUserRepo,
  deleteUserRepo,
  getUserByEmailRepo,
  getUserByIdRepo,
  updateUserRepo,
} from "../repositories/user.repositories";
import { ResponseError } from "../errors/response.error";
import bcrypt from "bcrypt";
import {
  IDataCreateUser,
  IDataUpdateUser,
  ILoginRequest,
} from "../types/user.types";
import jwt from "jsonwebtoken";

export const createUserService = async (body: IDataCreateUser) => {
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

export const updateUserService = (id: string, data: IDataUpdateUser) => {
  return updateUserRepo(id, data);
};

export const deleteUserService = (id: string) => {
  return deleteUserRepo(id);
};

export const getUserByIdService = async (id: string) => {
  const user = await getUserByIdRepo(id);
  if (!user) {
    throw new ResponseError("User not found", 404);
  }
  return user;
};
