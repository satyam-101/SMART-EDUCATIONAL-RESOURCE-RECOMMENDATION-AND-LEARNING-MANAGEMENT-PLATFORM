import { generateEmbedding } from "../lib/embedding";

interface CourseEmbeddingData {
  title: string;
  description: string;
  level: string;
  goals: string[];
}

export async function generateCourseEmbedding(
  course: CourseEmbeddingData
): Promise<number[]> {
  const text = `
Title: ${course.title}

Description: ${course.description}

Goals: ${course.goals.join(", ")}

Level: ${course.level}
`.trim();

  return generateEmbedding(text);
}