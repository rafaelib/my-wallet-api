import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import User from "../../src/entities/User";
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

describe("POST /sign-in", () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  it("should return 400 for empty email", async () => {
    const result = await agent
      .post("/sign-in")
      .send({ email: "", password: "123456" });
    expect(result.status).toBe(400);
  });

  it("should return 400 for invalid email", async () => {
    const result = await agent
      .post("/sign-in")
      .send({ email: "fakefake", password: "123456" });
    expect(result.status).toBe(400);
  });

  it("should return 400 for empty password password", async () => {
    const result = await agent
      .post("/sign-in")
      .send({ email: "fake@gmail.com", password: "" });
    expect(result.status).toBe(400);
  });

  it("should answer with status 401 wrong email or password", async () => {
    const newUser = await insertNewUser();

    const result = await agent
      .post("/sign-in")
      .send({ email: "fake@gmail.com", password: newUser.password });

    expect(result.status).toBe(401);
  });

  it("should answer with status 401 wrong email or password", async () => {
    const newUser = await insertNewUser();

    const result = await agent
      .post("/sign-in")
      .send({ email: newUser.email, password: "fake" });

    expect(result.status).toBe(401);
  });

  it("should return 200 and token for valid params", async () => {
    const newUser = await insertNewUser();
    const result = await agent
      .post("/sign-in")
      .send({ email: newUser.email, password: "supersenha" });
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
  });
});

describe("POST /sign-out", () => {
  let token: string;
  beforeEach(async () => {
    const body = createUser();
    await agent.post("/sign-up").send(body);
    const result = await agent
      .post("/sign-in")
      .send({ email: body.email, password: body.password });
    token = result.body.token;
  });
  it("returns status 200 for valid token", async () => {
    const result = await supertest(app)
      .post("/sign-out")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
  it("returns status 400 for invalid token", async () => {
    const result = await supertest(app)
      .post("/sign-out")
      .set("Authorization", "token");
    expect(result.status).toEqual(401);
  });
  it("returns status 401 for empty token", async () => {
    const result = await supertest(app).post("/sign-out");
    expect(result.status).toEqual(401);
  });
});
