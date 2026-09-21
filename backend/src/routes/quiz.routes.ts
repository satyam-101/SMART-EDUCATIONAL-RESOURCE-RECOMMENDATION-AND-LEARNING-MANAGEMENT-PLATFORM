import { Router } from "express";
import prisma from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.get("/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            optionA: true,
            optionB: true,
            optionC: true,
            optionD: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.json(quiz);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quiz",
    });
  }
});

router.post("/:quizId/submit", authenticate, async (req: AuthRequest, res) => {
  try {
    const quizId = req.params.quizId as string;
    const userId = req.userId!;

    const { answers } = req.body;

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({
        message: "Answers are required",
      });
    }

    const questions = await prisma.question.findMany({
      where: {
        quizId,
      },
    });

    if (questions.length === 0) {
      return res.status(404).json({
        message: "Quiz questions not found",
      });
    }

    let score = 0;

    for (const question of questions) {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    }

    const totalQuestions = questions.length;

    const percentage = (score / totalQuestions) * 100;

    const previousAttempts = await prisma.quizAttempt.count({
      where: {
        userId,
        quizId,
      },
    });

    const attemptNumber = previousAttempts + 1;

    const attempt = await prisma.quizAttempt.create({
      data: {
        score,
        totalQuestions,
        percentage,
        attemptNumber,
        userId,
        quizId,
      },
    });

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        topicId: true,
      },
    });

    if (quiz) {
      await prisma.progress.upsert({
        where: {
          userId_topicId: {
            userId,
            topicId: quiz.topicId,
          },
        },
        update: {
          completed: true,
        },
        create: {
          userId,
          topicId: quiz.topicId,
          completed: true,
        },
      });
    }

    res.json({
      message: "Quiz submitted successfully",
      result: {
        score,
        totalQuestions,
        percentage,
        attemptNumber,
        attemptId: attempt.id,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit quiz",
    });
  }
});

router.get("/:quizId/attempts", authenticate, async (req:AuthRequest, res) => {
  try {
    const quizId = req.params.quizId as string;
    const userId = req.userId!;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        quizId,
        userId
      },
      orderBy: {
        attemptNumber: "desc"
      }
    });

    res.json({
      quizId,
      attempts
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch quiz attempts"
    });
  }
});

export default router;
