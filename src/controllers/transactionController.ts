import { Request, Response, NextFunction } from "express";
import * as transactionService from "../services/transactionService";

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = res.locals;
    const result = await transactionService.createTransaction(userId);
    return res.send(result);
  } catch (err) {
    next(err);
  }
}
