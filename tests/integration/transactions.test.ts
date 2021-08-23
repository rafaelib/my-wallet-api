import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import app, { init } from "../../src/app";
import { clearDatabase } from "../utils/database";
import { createUser, insertNewUser } from "../factories/userFactory";
import Session from "../../src/entities/Session";

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

describe("POST /transactions", () => {
  let token: string;

  beforeEach(async () => {
    const body = createUser();
    await agent.post("/sign-up").send(body);
    const result = await agent
      .post("/sign-in")
      .send({ email: body.email, password: body.password });
    token = result.body.token;
  });
  it("should return 201 for valid params", async () => {
    const body = {
      amount: "10000",
      description: "fake",
      type: "income",
    };
    const result = await agent
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(201);
  });
  it("should return 400 for empty body", async () => {
    const body = {};
    const result = await supertest(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });
  it("should return 401 for empty token", async () => {
    const body = {
      value: 10000,
      description: "fake",
      type: "outcome",
    };
    const result = await supertest(app).post("/transactions").send(body);
    expect(result.status).toEqual(401);
  });
});

describe("GET /transactions", () => {
  let token: string;

  beforeEach(async () => {
    const body = createUser();
    await agent.post("/sign-up").send(body);
    const result = await agent
      .post("/sign-in")
      .send({ email: body.email, password: body.password });
    token = result.body.token;
  });
  it("should return an array for valid token", async () => {
    const result = await supertest(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(Array.isArray(result.body)).toBe(true);
  });
  it("should return 401 for empty token", async () => {
    const result = await supertest(app).get("/transactions");
    expect(result.status).toEqual(401);
  });
  it("should return 401 for invalid token", async () => {
    const result = await supertest(app)
      .get("/transactions")
      .set("Authorization", `Bearer token`);
    expect(result.status).toEqual(401);
  });
});
