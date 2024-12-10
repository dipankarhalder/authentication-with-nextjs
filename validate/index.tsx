import {z} from "zod";

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
  user_role: z.enum(["SUPER_USER", "ADMIN_USER", "STAFF_USER"], {
    required_error: "You need to select a users type.",
  }),
  email: emailValidate,
  phone: phoneValidate,
  password: passwordValidate,
});

export const ForgotPasswordSchema = z.object({
  email: emailValidate,
});
