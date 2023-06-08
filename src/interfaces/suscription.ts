import { UserI } from "~/db/models/User.model";

export interface Subscription {
  customer: UserI;
  paymentId: string;
  planId: string;
}
