import { getRepository } from "typeorm";
import User from "../entities/User";
import Session from "../entities/Session";
import NewUser from "../interfaces/NewUser";
import Signin from "../interfaces/Signin";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function createUser(user: NewUser): Promise<boolean> {
  const repository = getRepository(User);
  const alreadyRegistered = await repository.findOne({
    where: { email: user.email },
  });
  if (alreadyRegistered) return false;

  await repository.insert(user);

  return true;
}

export async function signin(data: Signin): Promise<object> {
  const user = await getRepository(User).findOne({
    where: { email: data.email },
  });
  if (!user || !bcrypt.compareSync(data.password, user.password)) return null;

  const token = uuid();
  await getRepository(Session).insert({
    userId: user.id,
    token,
  });
  return { token };
}

export async function signout(userId: Number): Promise<boolean> {
  const session = await getRepository(Session).findOne({ where: { userId } });
  if (session) {
    await getRepository(Session).remove(session);
    return true;
  }
  return false;
}
