import { Router } from "express";
import SetController from "./../controllers/setController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const setController = new SetController();

router.get("/", authMiddleware, setController.getSets);
router.post("/", authMiddleware, setController.createSet);
router.delete("/:setId", authMiddleware, setController.deleteSet);

export default router;
