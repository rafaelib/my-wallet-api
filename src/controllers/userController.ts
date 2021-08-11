import { Request, Response, NextFunction } from "express";
import newUserSchema from "../schemas/newUserSchema";
import * as userService from "../services/userService";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    throw new Error();
    if (newUserSchema.validate(req.body).error) return res.sendStatus(400);
    const newUser = await userService.createUser(req.body);
    if (!newUser) return res.sendStatus(409);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
