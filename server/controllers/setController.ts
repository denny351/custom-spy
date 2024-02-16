import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SetController {
  getSets: RequestHandler = async (req, res) => {
    try {
      const sets = await prisma.set.findMany();
      res.json(sets);
    } catch (error) {
      res.status(500).json({ error: "Error fetching sets." });
    }
  };
  createSet: RequestHandler = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    try {
      const createdSet = await prisma.set.create({
        data: {
          name: name.trim(),
          userId: req.userId,
        },
      });
      res.json(createdSet);
    } catch (error) {
      res.status(500).json({ error: "Error creating set." });
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
        return res.status(404).json({ error: "Set not found." });
      }

      if (set.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized." });
      }

      const deletedSet = await prisma.set.delete({
        where: {
          id: setId,
        },
      });
      res.json(deletedSet);
    } catch (error) {
      res.status(500).json({ error: "Error deleting set." });
    }
  };
}

export default SetController;
