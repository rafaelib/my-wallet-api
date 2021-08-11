import { Request, Response, NextFunction } from "express";
import newUserSchema from "../schemas/newUserSchema";
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
