import { getRepository, QueryRunner, getConnection } from "typeorm";
import User from "../entities/User";
import Session from "../entities/Session";
import Transaction from "../entities/Transaction";
import NewUser from "../interfaces/NewUser";
import Signin from "../interfaces/Signin";
import TransactionInt from "../interfaces/TransactionInt";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
