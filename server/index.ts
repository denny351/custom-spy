import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
