import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface NewLocationData {
  id: null;
  name: string;
}

interface UpdateLocationData {
  id: number;
  name: string;
}

interface createOrUpdateLocationsRequestBody {
  setId: number;
  locations: (NewLocationData | UpdateLocationData)[];
}

interface CustomError {
  error: string;
  statusCode: number;
}

const findAndCheckOwnershipOfLocation = async (locationId: number, userId: number) => {
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: { set: { select: { userId: true } } },
  });

  if (!location) {
    throw { error: "Location not found", statusCode: 404 };
  }

  if (location.set.userId !== userId) {
    throw { error: "You are not authorized to perform this action", statusCode: 403 };
  }
};

class LocationController {
  createOrUpdateLocations: RequestHandler = async (req, res) => {
    const { setId, locations } = <createOrUpdateLocationsRequestBody>req.body;

    const { newLocations, updatedLocations } = locations.reduce<{
      newLocations: NewLocationData[];
      updatedLocations: UpdateLocationData[];
    }>(
      (acc, location) => {
        if (location.id === null) {
          acc.newLocations.push(location);
        } else {
          acc.updatedLocations.push(location);
        }
        return acc;
      },
      { newLocations: [], updatedLocations: [] }
    );

    try {
      const createNewLocations = newLocations.map(async (location) => {
        return await prisma.location.create({
          data: { name: location.name, setId: setId },
        });
      });

      const updateLocations = updatedLocations.map(async (location) => {
        await findAndCheckOwnershipOfLocation(location.id, req.userId);
        return await prisma.location.update({
          where: { id: location.id },
          data: { name: location.name },
        });
      });

      await Promise.all([...createNewLocations, ...updateLocations]);

      const newUpdatedLocations = await prisma.location.findMany({
        where: {
          setId: setId,
        },
      });

      res.json(newUpdatedLocations);
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const customError = error as CustomError;
        res.status(customError.statusCode).json({ error: customError.error });
      } else {
        res.status(500).json({ error: "Error updating locations" });
      }
    }
  };

  deleteLocation: RequestHandler<{ locationId: string }> = async (req, res) => {
    const locationId = parseInt(req.params.locationId);

    try {
      await findAndCheckOwnershipOfLocation(locationId, req.userId);

      await prisma.location.delete({
        where: { id: locationId },
      });
      res.status(204).end();
    } catch (error) {
      if (typeof error === "object" && error !== null) {
        const customError = error as CustomError;
        res.status(customError.statusCode).json({ error: customError.error });
      } else {
        res.status(500).json({ error: "Error deleting location" });
      }
    }
  };
}

export default LocationController;
