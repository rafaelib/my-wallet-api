import { getRepository } from "typeorm";

import User from "../entities/User";

interface newUser {
  email: string;
  password: string;
}

export async function createUser(user: newUser): Promise<boolean> {
  const repository = getRepository(User);
  const alreadyRegistered = await repository.findOne({
    where: { email: user.email },
  });
  if (alreadyRegistered) return false;

  await repository.insert(user);

  return true;
}
