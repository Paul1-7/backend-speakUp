import { Router } from "express";
import postLogin from "../controllers/auth.controller";
import { addUser } from "../controllers/user.controller";
import { validateScheme } from "~/middlewares";
import { UserSchema } from "~/schemas";

const routeUser = Router();

routeUser.post("/login", postLogin)
  .post("/signup",  addUser);

export default routeUser;
