import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;

    const topic = await prisma.topic.findUnique({
      where: {
        id: topicId
      },
      include: {
        resources: true,
        quiz: true
      }
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found"
      });
    }

    res.json(topic);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch topic"
    });
  }
});

export default router;