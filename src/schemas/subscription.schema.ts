import { z } from "zod";
import { UserSchema } from "./user.schema";

export const subscriptionSchema = z.object({
  body: z.object({
    customer: UserSchema,
    paymentId: z.string().nonempty({ message: "the plan cannot be empty" }),
    planId: z.string().nonempty({ message: "the plan cannot be empty" }),
  }),
});
