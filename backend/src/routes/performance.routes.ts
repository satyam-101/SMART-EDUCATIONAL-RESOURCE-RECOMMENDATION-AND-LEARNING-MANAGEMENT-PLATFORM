import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import { recommendNextAction } from "../services/ai.service";

const router = Router();

router.get("/:attemptId", authenticate, async (req:AuthRequest, res) => {
  try {
    const attemptId = req.params.attemptId as string;
    const userId = req.userId!;

    const attempt = await prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        userId
      },
      include: {
        quiz: {
          include: {
            topic: true
          }
        }
      }
    });

    if (!attempt) {
      return res.status(404).json({
        message: "Quiz attempt not found"
      });
    }

    const recommendation = await recommendNextAction(
      attempt.quiz.topic.title,
      attempt.score,
      attempt.totalQuestions,
      attempt.percentage
    );

    const validActions = [
      "REVIEW",
      "PRACTICE",
      "RETAKE",
      "NEXT_TOPIC"
    ];

    if (!validActions.includes(recommendation.action)) {
      return res.status(500).json({
        message: "Invalid AI recommendation"
      });
    }

    res.json({
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      percentage: attempt.percentage,
      recommendation
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate performance recommendation"
    });
  }
});

export default router;