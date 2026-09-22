import * as yup from "yup";
export const registerSchema = yup.object({
  name: yup.string().trim().matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, "Name can contain only letters and spaces").required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Password must contain at least one letter, one digit, and one special character")
    .min(6, "Password must be at least 6 character")
    .max(15, "Password cannot exceed 15 character")
    .required("Password is required"),
});