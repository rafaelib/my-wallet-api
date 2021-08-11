import "./setup";
import errorHandler from "./middlewares/errorHandler";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.createUser);

app.use(errorHandler);

export async function init() {
  await connectDatabase();
}

export default app;
