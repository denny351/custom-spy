import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAndCheckOwnershipOfLocation = async (locationId: number, userId: number) => {
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: { set: { select: { userId: true } } },
  });

  if (!location) {
    return { error: "Location not found", statusCode: 404 };
  }

  if (location.set.userId !== userId) {
    return { error: "You are not authorized to perform this action", statusCode: 403 };
  }

  return {};
};

class LocationController {
  createLocation: RequestHandler = async (req, res) => {
    const { name, setId } = req.body;

    if (!name || !setId) {
      return res.status(400).json({ error: "Name and Set ID is required" });
    }

    try {
      const newLocation = await prisma.location.create({
        data: { name, setId: parseInt(setId) },
      });
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json({ error: "Error creating location" });
    }
  };

  updateLocation: RequestHandler = async (req, res) => {
    const locationId = parseInt(req.params.locationId);
    const { name } = req.body;

    try {
      const { error, statusCode } = await findAndCheckOwnershipOfLocation(locationId, req.userId);
      if (error) {
        return res.status(statusCode).json({ error });
      }

      const updatedLocation = await prisma.location.update({
        where: { id: locationId },
        data: { name },
      });
      res.json(updatedLocation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error updating location" });
    }
  };

  deleteLocation: RequestHandler = async (req, res) => {
    const locationId = parseInt(req.params.locationId);

    try {
      const { error, statusCode } = await findAndCheckOwnershipOfLocation(locationId, req.userId);
      if (error) {
        return res.status(statusCode).json({ error });
      }

      await prisma.location.delete({
        where: { id: locationId },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting location" });
    }
  };
}

export default LocationController;
