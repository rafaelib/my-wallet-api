import { Request, Response, NextFunction } from "express";
import * as transactionService from "../services/transactionService";
import newTransactionchema from "../schemas/newTransactionSchema";

export async function getTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = res.locals;
    const result = await transactionService.getTransactions(userId);
    return res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = res.locals;
    if (newTransactionchema.validate(req.body).error)
      return res.sendStatus(400);
    req.body.userId = userId;
    await transactionService.createTransaction(req.body);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}
