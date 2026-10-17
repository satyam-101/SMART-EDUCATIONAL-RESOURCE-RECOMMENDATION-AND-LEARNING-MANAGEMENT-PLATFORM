import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        learningGoal: true,
        skillLevel: true,
        interests: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile"
    });
  }
});

export default router;