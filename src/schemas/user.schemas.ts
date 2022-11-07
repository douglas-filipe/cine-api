import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  email: yup.string().email().strict().required(),
  name: yup.string().strict().required(),
  password: yup.string().strict().required(),
  admin: yup.boolean().notRequired(),
});
