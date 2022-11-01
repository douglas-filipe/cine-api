import express from "express";

import { Router, Request, Response } from "express";

const app = express();

const route = Router();

app.use(express.json());

app.use(route);

route.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Ola" });
});

export { app };
