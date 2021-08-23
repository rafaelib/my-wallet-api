import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Session from "../entities/Session";

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];
  if (!token) return res.sendStatus(401);
  const user = await getRepository(Session).findOne({ token });
  if (!user) {
    return res.sendStatus(401);
  }
  res.locals.userId = Number(user.userId);
  next();
}
