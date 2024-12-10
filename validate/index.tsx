import {z} from "zod";

const emailValidate = z.string().email({
  message: "Email must be a valid email address.",
});

const passwordValidate = z.string().min(6, {
  message: "Password must be at least 6 characters.",
}).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  {message: "Password must contain at least uppercase, lowercase, number, and special character.",}
);

const phoneValidate = z.string().min(10, {
  message: "Phone no must be 10 characters.",
});

export const SigninSchema = z.object({
  email: emailValidate,
  password: passwordValidate,
});

export const SignupSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: emailValidate,
  phone: phoneValidate,
  password: passwordValidate,
});

export const ForgotPasswordSchema = z.object({
  email: emailValidate,
});
