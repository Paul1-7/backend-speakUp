import Stripe from "stripe";
import { CONFIG } from "~/config/config";

export const stripe = new Stripe(CONFIG.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15", typescript: true });
