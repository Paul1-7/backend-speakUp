import { z } from "zod";

export const UserSchema = z.object({
  first_name: z
    .string()
    .nonempty("First name is required")
    .min(2, { message: "First name must have at least 2 characters" }),
  last_name: z
    .string()
    .nonempty("Last name is required")
    .min(2, { message: "Last name must have at least 2 characters" }),
  email: z.string().nonempty("Email is required").email({ message: "Enter a valid email address" }),
  password: z.string().nonempty("Password is required").min(8, { message: "Password must have at least 8 characters" }),
  age: z.number().min(1).max(2)
});
