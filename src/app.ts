import "./setup";
import errorHandler from "./middlewares/errorHandler";
import authHandler from "./middlewares/authHandler";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as transactionController from "./controllers/transactionController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.createUser);
app.post("/sign-in", userController.signin);
app.post("/sign-out", authHandler, userController.signout);
app.get("/transactions", authHandler, transactionController.createTransaction);

app.use(errorHandler);

export async function init() {
  await connectDatabase();
}

export default app;
