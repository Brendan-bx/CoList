import * as yup from "yup";

export const nameValidator = yup.string().min(3).required();
export const contentValidator = yup.string().min(3).required();
export const emailValidator = yup.string().email().required();
export const descValidator = yup.string().min(3).required();
