import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SetController {
  // Could have a seperate endpoint for getting locations, but this should be a relatively small response
  getSetsWithLocations: RequestHandler = async (req, res) => {
    try {
      const setsWithLocations = await prisma.set.findMany({
        where: {
          userId: req.userId,
        },
        include: {
          locations: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      res.json(setsWithLocations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching sets" });
    }
  };

  createSet: RequestHandler = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      const newSet = await prisma.set.create({
        data: {
          name: name.trim(),
          userId: req.userId,
        },
      });
      res.status(201).json(newSet);
    } catch (error) {
      res.status(500).json({ error: "Error creating set" });
    }
  };

  deleteSet: RequestHandler = async (req, res) => {
    const setId = parseInt(req.params.setId);

    try {
      const set = await prisma.set.findUnique({
        where: {
          id: setId,
        },
      });

      if (!set) {
        return res.status(404).json({ error: "Set not found" });
      }

      if (set.userId !== req.userId) {
        return res.status(403).json({ error: "You are not authorized to delete this set" });
      }

      await prisma.set.delete({
        where: {
          id: setId,
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting set" });
    }
  };
}

export default SetController;
