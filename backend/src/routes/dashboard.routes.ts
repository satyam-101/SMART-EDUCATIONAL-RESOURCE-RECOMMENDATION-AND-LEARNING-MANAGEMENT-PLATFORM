import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        learningGoal: true,
        skillLevel: true,
        interests: true
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const progress = await prisma.progress.findMany({
      where: {
        userId
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
            course: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId
      },
      include: {
        quiz: {
          select: {
            id: true,
            title: true,
            topic: {
              select: {
                title: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    });

    res.json({
      user,
      progress,
      recentAttempts: attempts
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch dashboard data"
    });
  }
});

export default router;