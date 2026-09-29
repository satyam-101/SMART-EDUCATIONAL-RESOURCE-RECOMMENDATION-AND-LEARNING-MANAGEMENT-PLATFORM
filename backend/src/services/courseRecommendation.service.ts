import { courseIndex } from "../config/pinecone";
import { generateEmbedding } from "../lib/embedding";
import prisma  from '../lib/prisma'

export async function searchRelevantCourses(
  goal: string,
  level: string
) {
  const queryText = `
Goal: ${goal}
`.trim();

  const queryEmbedding = await generateEmbedding(queryText);

  const result = await courseIndex.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
    
  });

  const threshold = 0.6;

    const relevantCourses = result.matches.filter(
        (match) => (match.score ?? 0) >= threshold
    );
    if(relevantCourses.length === 0){
      return [];
    }

    const courseIds = relevantCourses.map(
      (match) => match.id
    );

    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: courseIds,
        },
      },
    });

    const courseMap = new Map(
      courses.map((course) => [course.id, course])
    );

    return relevantCourses
      .map((match) => ({
        course: courseMap.get(match.id),
        similarityScore: match.score,
      }))
      .filter((item) => item.course !== undefined);
}