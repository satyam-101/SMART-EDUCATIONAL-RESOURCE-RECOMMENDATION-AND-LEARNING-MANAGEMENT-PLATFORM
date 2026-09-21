import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        topics: {
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        title: "asc"
      }
    });

    res.json(courses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch courses"
    });
  }
});

// Get one course with its topics
router.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId
      },
      include: {
        topics: {
          orderBy: {
            order: "asc"
          }
        }
      }
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.json(course);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch course"
    });
  }
});

export default router;