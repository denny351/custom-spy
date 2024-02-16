import { RequestHandler, Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

const usersMiddleware: RequestHandler = (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required." });
  }
  next();
};

router.post("/register", usersMiddleware, userController.registerUser);
router.post("/login", usersMiddleware, userController.loginUser);

export default router;
