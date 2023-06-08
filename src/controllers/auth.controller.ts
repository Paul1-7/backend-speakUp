import jwt from "jsonwebtoken";
import chekUserCredential from "../services/auth.service";
import UsersService from "../services/user.service";
import { CONFIG } from "~/config/config";
import { NextFunction, Request, Response } from "express";
import SubscriptionService from "~/services/subscriptions.service";

const postLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await chekUserCredential(email, password);
    const userJson = await user?.toJSON();
    if (!user) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const subscription = await SubscriptionService.getIdSubscriptionAndIdCustomerByEmail(email);
    const hasSubscriptionActive = await SubscriptionService.hasSubscriptionActive(subscription?.idSubscription);

    const token = jwt.sign(
      {
        id: userJson.id,
        first_name: userJson.first_name,
        last_name: userJson.last_name,
        hasSubscriptionActive,
      },
      CONFIG.JWT_SECRET,
      { expiresIn: "6h" },
    );

    //? Update the user´s token
    UsersService.updateUser(user.id, { token });

    return res.status(200).json({
      message: "Correct credentials",
      token,
      first_name: userJson.first_name,
      last_name: userJson.last_name,
      hasSubscriptionActive,
      id: userJson.id,
    });
  } catch (error) {
    next(error);
  }
};

export default postLogin;
