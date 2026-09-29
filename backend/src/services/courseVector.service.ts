import { courseIndex } from "../config/pinecone";
import { generateCourseEmbedding } from "../utils/courseEmbedding";

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  goals: string[];
}

export async function indexCourse(course: Course) {
  const embedding = await generateCourseEmbedding(course);

  await courseIndex.upsert({
    records:[
    {
      id: course.id,
      values: embedding,
      metadata: {
        courseId: course.id,
        title: course.title,
        level: course.level
      },
    },
  ]});
  console.log(`Indexed course: ${course.title}`);
}