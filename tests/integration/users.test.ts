import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser, insertNewUser } from "../factories/userFactory";
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

const agent = supertest(app);

describe("POST /sign-up", () => {
  it("should return status 201 for valid params", async () => {
    const newUser = createUser();
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toBe(201);
  });

  it("should return status 400 for empty name", async () => {
    const newUser = createUser();
    newUser.name = "";
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toBe(400);
  });

  it("should return status 400 for unmatching passwords", async () => {
    const newUser = createUser();
    newUser.confirmPassword = "123";
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toBe(400);
  });

  it("should return status 400 for invalid email", async () => {
    const newUser = createUser();
    newUser.email = "banana";
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toBe(400);
  });

  it("should return status 409 for already registered email", async () => {
    await insertNewUser();
    const newUser = createUser();
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toBe(409);
  });
});
