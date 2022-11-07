import * as yup from "yup";

export const createPaymentSchema = yup.object().shape({
  description: yup.string().strict().required(),
  name: yup.string().strict().required(),
  number: yup.string().strict().required(),
  month: yup.string().strict().required(),
  year: yup.string().strict().required(),
  cvc: yup.string().strict().required(),
});
