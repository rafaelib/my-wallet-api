import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

export async function createUser(password = "123456") {
  const user = {
    name: faker.fake.name,
    email: "email@email.com",
    password,
  };

  return user;
}
