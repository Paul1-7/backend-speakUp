import { NextFunction, Request, Response } from "express";
import { stripe } from "~/libs";

export function getPlans(req: Request, res: Response, next: NextFunction) {
  try {
    stripe.plans
      .list({ expand: ["data.product"] })
      .then((plans) => {
        return res.json(plans.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    next(error);
  }
}
export function getPlansById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    stripe.plans
      .list({ expand: ["data.product"] })
      .then((plans) => {
        const planFounded = plans.data.find((plan) => id === plan.id);

        if (!planFounded) {
          return res.status(404).json("pricing plan not found");
        }
        return res.json(planFounded);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    next(error);
  }
}
