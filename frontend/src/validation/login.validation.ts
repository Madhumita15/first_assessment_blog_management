import * as yup from 'yup'
export const LoginSchema = yup.object({
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().required("Password is required")

})