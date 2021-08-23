import { getRepository } from "typeorm";

import Transaction from "../entities/Transaction";

import TransactionInt from "../interfaces/TransactionInt";

import dayjs from "dayjs";

export async function getTransactions(userId: number): Promise<Transaction[]> {
  const allTransactions = await getRepository(Transaction).find({
    where: { userId },
  });

  return allTransactions;
}

export async function createTransaction(
  body: TransactionInt
): Promise<boolean> {
  body.date = dayjs().format("DD/MM");
  await getRepository(Transaction).insert(body);
  return true;
}
