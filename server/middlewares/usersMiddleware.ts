import { RequestHandler } from "express";

const usersMiddleware: RequestHandler = (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }
  next();
};

export default usersMiddleware;
