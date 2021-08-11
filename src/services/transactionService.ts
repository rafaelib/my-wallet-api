import { getRepository } from "typeorm";
import User from "../entities/User";
import Session from "../entities/Session";
import Transaction from "../entities/Transaction";
import NewUser from "../interfaces/NewUser";
import Signin from "../interfaces/Signin";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function createTransaction(
  userId: number
): Promise<Transaction[]> {
  const allTransactions = await getRepository(Transaction).find({
    where: { userId },
  });
  console.log(allTransactions);

  return allTransactions;
}
