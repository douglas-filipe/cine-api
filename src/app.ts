import { Response } from "express";
import { adminRoutes } from "./routes/admin.routes";
import { cartRoutes } from "./routes/cart.routes";
import { ticketRoutes } from "./routes/ticket.routes";
import { userRoutes } from "./routes/user.routes";
import { paymentRoutes } from "./routes/payment.routes";
import { config } from "dotenv";

import express from "express";

const app = express();

config();

app.use(express.json());

app.use(userRoutes);
app.use(adminRoutes);
app.use(ticketRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);

app.get("/", async (__, res: Response) => {
  res.json({ message: "Running" });
});

export { app };
