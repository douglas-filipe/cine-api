import { createUserRepo, IDataInput } from "../repositories/user.repositories";
import bcrypt from "bcrypt";

export const createUserService = async (body: IDataInput) => {
  const { password } = body;
  body.password = bcrypt.hashSync(password, 10);
  const user = await createUserRepo(body);
  return user;
};
