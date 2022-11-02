import express from "express";
import { Response } from "express";
import { adminRoutes } from "./routes/admin.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(adminRoutes);

app.get("/", async (__, res: Response) => {
  res.json({ message: "Running" });
});

export { app };
