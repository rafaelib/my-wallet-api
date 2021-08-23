import { Request, Response, NextFunction } from "express";
import newUserSchema from "../schemas/newUserSchema";
import userSchema from "../schemas/userSchema";
import * as userService from "../services/userService";
import bcrypt from "bcrypt";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (newUserSchema.validate(req.body).error) return res.sendStatus(400);
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await userService.createUser(req.body);
    if (!newUser) return res.sendStatus(409);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    if (userSchema.validate(req.body).error) return res.sendStatus(400);
    const result = await userService.signin(req.body);
    if (!result) return res.sendStatus(401);
    return res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function signout(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals;
    const result = await userService.signout(userId);
    if (!result) return res.sendStatus(400);
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
