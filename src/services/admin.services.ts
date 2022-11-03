import { listAllUsersRepo } from "../repositories/user.repositories";

export const listAllUsersService = () => {
  return listAllUsersRepo();
};
