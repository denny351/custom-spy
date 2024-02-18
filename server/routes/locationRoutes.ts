import { Router } from "express";
import LocationController from "./../controllers/locationController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const locationController = new LocationController();

router.post("/", authMiddleware, locationController.createOrUpdateLocations);
router.delete("/:locationId", authMiddleware, locationController.deleteLocation);

export default router;
