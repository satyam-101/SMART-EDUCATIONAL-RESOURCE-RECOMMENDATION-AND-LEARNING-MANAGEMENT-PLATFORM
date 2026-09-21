import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import { recommendCourses } from "../services/ai.service";

const router = Router();

router.post("/", authenticate, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (!user.learningGoal || !user.skillLevel || !user.interests) {
      return res.status(400).json({
        message: "Please complete onboarding first"
      });
    }

    const aiResult = await recommendCourses(
      user.learningGoal,
      user.skillLevel,
      user.interests
    );

    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true
      }
    });

    const validRecommendations = aiResult.recommendations.filter(
      (recommendation: {
        courseTitle: string;
        reason: string;
      }) =>
        courses.some(
          (course) => course.title === recommendation.courseTitle
        )
    );

    const recommendations = validRecommendations.map(
      (recommendation: {
        courseTitle: string;
        reason: string;
      }) => {
        const course = courses.find(
          (course) => course.title === recommendation.courseTitle
        );

        return {
          courseId: course!.id,
          courseTitle: course!.title,
          description: course!.description,
          reason: recommendation.reason
        };
      }
    );

    res.json({
      recommendations
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate course recommendations"
    });
  }
});

export default router;