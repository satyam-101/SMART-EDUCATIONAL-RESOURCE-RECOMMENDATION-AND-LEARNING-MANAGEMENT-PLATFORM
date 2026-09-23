import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppLayout } from './layouts/AppLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { PublicLayout } from './layouts/PublicLayout';
import { useAuth } from './hooks/useAuth';
import { CustomCursor } from './components/motion/CustomCursor';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { SmoothScroll } from './lib/smoothScroll';
import { AITutorDock } from './components/ai/AITutorDock';
import { PageTransition } from './components/motion/PageTransition';
import { Landing } from './pages/Landing';
import { Roadmap } from './pages/Roadmap';
import { Careers } from './pages/Careers';
import { CareerDetail } from './pages/CareerDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { CourseDetail } from './pages/CourseDetail';
import { LessonPlayer } from './pages/LessonPlayer';
import { AITutor } from './pages/AITutor';
import { StudyPlanner } from './pages/StudyPlanner';
import { QuizPage } from './pages/QuizPage';
import { QuizResult } from './pages/QuizResult';
import { Progress } from './pages/Progress';
import { Practice } from './pages/Practice';
import { Projects } from './pages/Projects';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

export function App() {
  const location = useLocation();

  // Start each route at the top of the page — otherwise the next route
  // inherits the previous route's scroll offset and renders mid-scroll.
  useEffect(() => {
    const { hash } = location;
    if (hash) {
      const raf = requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <AITutorDock />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
        {/* Public marketing shell */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
          <Route path="/roadmap/:domainId" element={<PageTransition><Roadmap /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/careers/:pathId" element={<PageTransition><CareerDetail /></PageTransition>} />
        </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* App (protected) */}
      <Route element={<Protected />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/courses" element={<Explore />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/:id/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/ai-tutor" element={<AITutor />} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:id/result" element={<QuizResult />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}

function Protected() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
