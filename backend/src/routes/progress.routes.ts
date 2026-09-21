import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const progress = await prisma.progress.findMany({
      where: {
        userId
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
            order: true,
            course: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    });

    res.json(progress);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch progress"
    });
  }
});

router.get("/courses", authenticate, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const courses = await prisma.course.findMany({
      include: {
        topics: {
          include: {
            progress: {
              where: {
                userId
              }
            }
          },
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        title: "asc"
      }
    });

    const result = courses.map((course) => {
      const totalTopics = course.topics.length;

        const completedTopics = course.topics.filter((topic) => {
        return topic.progress.some((progress) => progress.completed);
        }).length;

        const percentage =
        totalTopics === 0
            ? 0
            : Math.round((completedTopics / totalTopics) * 100);

      return {
        courseId: course.id,
        courseTitle: course.title,
        totalTopics,
        completedTopics,
        percentage
      };
    });

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch course progress"
    });
  }
});

export default router;