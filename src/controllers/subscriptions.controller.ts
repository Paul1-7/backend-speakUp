import { NextFunction, Request, Response } from "express";
import { Subscription } from "~/interfaces";
import { stripe } from "~/libs";

export async function newSubscription(req: Request, res: Response, next: NextFunction) {
  try {
    const data: Subscription = req.body;
    const { customer, paymentId, planId } = data;

    const customerStripe = await stripe.customers.create({
      name: customer.first_name,
      email: customer.email,
      payment_method: paymentId,
    });

    const subscription = stripe.subscriptions.create({
      customer: customerStripe.id,
      items: [{ plan: planId }],
      default_payment_method: paymentId,
      expand: ["latest_invoice.payment_intent"],
    });

    //crear user

    res.status(200).json({ suscripcion: subscription });
  } catch (error) {
    next(error);
  }
}
