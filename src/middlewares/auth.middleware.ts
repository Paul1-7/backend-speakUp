import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CONFIG } from "../config/config";
import Users from "~/db/models/User.model";

type Token = {
  userId: string | undefined;
  name: string;
  surname: string;
  username: string;
  role: string;
  iat?: number;
} & JwtPayload;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];
  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7);
    try {
      //? Token exists
      const token = jwt.verify(bearerToken, CONFIG.JWT_SECRET);
      //? Fetch user valid token
      const user = await Users.findByPk((token as Token)?.id);
      if (!user) {
        res.status(404).json({ error: "User is not identified" });
      }
      console.log("desde AUTH Middleware: ", token);
      next();
    } catch (error) {
      //! Invalid token
      res.status(400).json({
        error: "Invalid token",
        message: error,
      });
    }
  } else {
    //! Token does not exist in the request
    res.status(400).json({
      error: "Access denied!",
    });
  }
};

export default validateToken;
