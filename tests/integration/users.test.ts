import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should return status 201 for valid params", async () => {
    const newUser = createUser();
    const result = await supertest(app).post("/sign-up").send(newUser);
    expect(result.status).toBe(201);
  });
});
