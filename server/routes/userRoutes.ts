import { Router } from "express";
import UserController from "../controllers/userController";
import usersMiddleware from "../middlewares/usersMiddleware";

const router = Router();
const userController = new UserController();

router.post("/register", usersMiddleware, userController.registerUser);
router.post("/login", usersMiddleware, userController.loginUser);

export default router;
