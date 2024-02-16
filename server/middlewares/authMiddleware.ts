import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is not valid" });
  }
};

export default authMiddleware;
