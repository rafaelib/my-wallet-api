import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Session from "../entities/Session";

function return401(res: Response) {
  return res.sendStatus(401);
}

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) return401(res);
  const token = authorization.split(" ")[1];
  if (!token) return401(res);
  const user = await getRepository(Session).findOne({ token });
  if (!user) return401(res);
  res.locals.userId = Number(user.id);
  next();
}
