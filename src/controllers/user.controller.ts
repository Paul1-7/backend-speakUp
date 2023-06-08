import { NextFunction, Request, Response } from "express";
import { sequelize } from "~/db/models";
import { UserI } from "~/db/models/User.model";
import UsersService from "~/services/user.service";
import Sequelize from "sequelize";

const msg = {
  addSuccess: "The account was created correctly",
  duplicateEmail: "There is already an account with that email",
};

export function getUsers(request: Request, response: Response, next: NextFunction) {
  UsersService.findAndCount(request.query)
    .then((resultUsers) => {
      return response.status(201).json({ results: resultUsers });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    })
    .finally(async () => {
      await sequelize.close();
    });
}

export async function addUser(request: Request, response: Response, next: NextFunction) {
  const body: UserI = request.body;
  try {
    const newUser = await UsersService.createUser(body);
    return response.status(201).json({ message: msg.addSuccess, newUser });
  } catch (error) {
    console.log(error);
    if (error instanceof Sequelize.UniqueConstraintError) {
      return response.status(400).json({ message: "Email or username already exist" });
    }
    if (error instanceof Sequelize.ValidationError) {
      return response.status(400).json({ message: "missing fields" });
    }
    next(error);
  } finally {
    await sequelize.close();
  }
}

export async function getUserById(request: Request, response: Response, next: NextFunction) {
  try {
    const { id } = request.params;
    const user = await UsersService.getUserOr404(id);
    return response.status(200).json({ result: user });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
