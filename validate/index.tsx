import {z} from "zod";
import {user_roles} from "@/utils";

const emailValidate = z.string().email({
  message: "Email must be a valid email address.",
});

const passwordValidate = z.string()
  .min(6, {
    message: "Password must be at least 6 characters.",
  })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.",
  });

const phoneValidate = z.string()
  .length(10, {
    message: "Phone number must be exactly 10 digits."
  })
  .regex(/^\d{10}$/, {
    message: "Phone number must contain only digits."
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
  user_role: z.string().refine((role) => user_roles.includes(role), {
    message: "Invalid user role. Please select a valid role.",
  }),
  email: emailValidate,
  phone: phoneValidate,
  password: passwordValidate,
});

export const ForgotPasswordSchema = z.object({
  email: emailValidate,
});
