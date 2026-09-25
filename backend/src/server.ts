import express from 'express';
import cors from 'cors';
import { authenticate, AuthRequest } from "./middleware/auth.middleware";
import authRoutes from './routes/auth.routes';
import onboardingRoutes from './routes/onboarding.routes';
import courseRoutes from './routes/course.routes';
import topicRoutes from './routes/topic.routes';
import quizRoutes from './routes/quiz.routes';
import progressRoutes from './routes/progress.routes';
import recommendationRoutes from './routes/recommendation.routes';
import performanceRoutes from './routes/performance.routes';
import dashboardRoutes from './routes/dashboard.routes';

import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "successfully connected"
    });
});

app.get("/api/health", authenticate, (req: AuthRequest, res) => {
  res.json({
    status: "OK"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});



