import { getRepository } from "typeorm";
import User from "../entities/User";
import NewUser from "../interfaces/NewUser";
import Signin from "../interfaces/Signin";
import bcrypt from "bcrypt";

export async function createUser(user: NewUser): Promise<boolean> {
  const repository = getRepository(User);
  const alreadyRegistered = await repository.findOne({
    where: { email: user.email },
  });
  if (alreadyRegistered) return false;

  await repository.insert(user);

  return true;
}

export async function signin(data: Signin): Promise<boolean> {
  const user = await getRepository(User).findOne({
    where: { email: data.email },
  });
  if (!user || !bcrypt.compareSync(data.password, user.password)) return false;
  return true;
}
