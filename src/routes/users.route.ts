import { Router } from "express";
import { getUsers, addUser } from "~/controllers/user.controller";
import { validateScheme } from "~/middlewares";
import validateToken from "~/middlewares/auth.middleware";
import { UserSchema } from "~/schemas";

const routeUser = Router();

routeUser
  .get("/", validateToken, getUsers);
// .post("/", [validateScheme(UserSchema)], addUser);

export default routeUser;
