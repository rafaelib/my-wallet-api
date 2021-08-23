import { getRepository } from "typeorm";
import User from "../../src/entities/User";
import newUser from "../../src/interfaces/NewUser";
import bcrypt from "bcrypt";

export function createUser(): newUser {
  const user = {
    name: "nomeexemplo",
    email: "email@email.com",
    password: "supersenha",
    confirmPassword: "supersenha",
  };

  return user;
}

export async function insertNewUser() {
  const repository = getRepository(User);
  const newUser = createUser();
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  await repository.insert(newUser);
  return newUser;
}
