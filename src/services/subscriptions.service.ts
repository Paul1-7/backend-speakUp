import Stripe from "stripe";
import { stripe } from "~/libs";

interface CustomerWithSubscriptions extends Stripe.Customer {
  subscriptions: Stripe.ApiList<Stripe.Subscription>;
}

interface IdSubscriptionWithIdCustomer {
  idCustomer: string;
  idSubscription: string;
}

export default class SubscriptionService {
  static async getIdSubscriptionAndIdCustomerByEmail(email: string): Promise<IdSubscriptionWithIdCustomer | null> {
    const customers = await stripe.customers.list({ email, expand: ["data.subscription"] });

    if (customers.data.length === 0) {
      return null;
    }

    const customerId = customers.data[0].id;
    const customer = (await stripe.customers.retrieve(customerId, {
      expand: ["subscriptions"],
    })) as CustomerWithSubscriptions;

    if (customer.subscriptions.data.length === 0) {
      return null;
    }

    const subscriptionId = customer.subscriptions.data[0].id;

    return {
      idCustomer: customerId,
      idSubscription: subscriptionId,
    };
  }

  static async hasSubscriptionActive(subscriptionId: string | undefined): Promise<boolean> {
    if (!subscriptionId) {
      return false;
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return subscription.status === "active" ? true : false;
  }
}
