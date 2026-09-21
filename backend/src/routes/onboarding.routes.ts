import { Response, Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.put("/", authenticate, async (req:AuthRequest, res:Response) => {
  try {
    const { learningGoal, skillLevel, interests } = req.body;

    if (!learningGoal || !skillLevel || !interests) {
      return res.status(400).json({
        message: "Learning goal, skill level and interests are required"
      });
    }

    const user = await prisma.user.update({
      where: {
        id: req.userId!
      },
      data: {
        learningGoal,
        skillLevel,
        interests
      }
    });

    res.json({
      message: "Onboarding completed successfully",
      user: {
        id: user.id,
        name: user.name,
        learningGoal: user.learningGoal,
        skillLevel: user.skillLevel,
        interests: user.interests
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

export default router;