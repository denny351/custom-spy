import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserController {
  registerUser: RequestHandler = async (req, res) => {
    const { name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
      const user = await prisma.user.create({
        data: {
          name,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: "Cannot register user." });
    }
  };

  loginUser: RequestHandler = async (req, res) => {
    const { name, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          name,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Authentication failed." });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: "Cannot log in." });
    }
  };
}

export default new UserController();
