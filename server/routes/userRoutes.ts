import { Router } from "express";
import UserController from "../controllers/userController";
import usersMiddleware from "../middlewares/usersMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.get("/", authMiddleware, userController.getUserId);
router.post("/register", usersMiddleware, userController.registerUser);
router.post("/login", usersMiddleware, userController.loginUser);
router.get("/google", userController.googleAuth);
router.get("/google/callback", userController.googleAuthCallback);

export default router;
