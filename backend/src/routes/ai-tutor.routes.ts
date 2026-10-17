import { Router } from "express";
import { askAiTutor } from "../services/ai.service";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { question, topic, history } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required"
      });
    }

    const answer = await askAiTutor(question, topic, history);

    res.json({
      answer
    });
  } catch (error) {
    console.error("AI Tutor route error:", error);

    res.status(500).json({
      message: "Failed to generate AI tutor response"
    });
  }
});

export default router;