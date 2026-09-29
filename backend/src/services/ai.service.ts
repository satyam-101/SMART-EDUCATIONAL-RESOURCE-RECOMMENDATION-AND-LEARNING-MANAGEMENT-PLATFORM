import Groq from "groq-sdk";
import { searchRelevantCourses } from "./courseRecommendation.service";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "dummy_key"
});

function parseJsonResponse(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Groq returned invalid JSON");
    }

    const jsonString = content.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  }
}

export async function recommendCourses(
  learningGoal: string,
  skillLevel: string,
  interests: string
) {
  try {
    // 1. Get semantically relevant courses from Pinecone
    const relevantCourses = await searchRelevantCourses(
      learningGoal,
      skillLevel
    );

    // 2. No suitable courses found
    if (relevantCourses.length === 0) {
      return {
        recommendations: [],
        message: "No suitable courses found for this learning goal.",
      };
    }

    // 3. Give ONLY retrieved courses to Groq
    const availableCourses = relevantCourses.map((item) => ({
      id: item.course!.id,
      title: item.course!.title,
      description: item.course!.description,
      level: item.course!.level,
      goals: item.course!.goals,
      similarityScore: item.similarityScore,
    }));

    const prompt = `
You are an educational course recommendation assistant.

Student information:

Learning goal: ${learningGoal}
Skill level: ${skillLevel}
Interests: ${interests}

The following courses were found to be semantically relevant to the student's goal:

${JSON.stringify(availableCourses, null, 2)}

Your task is to select and organize the most relevant courses for this student.

Rules:
1. Recommend ONLY courses from the provided list.
2. NEVER invent a course.
3. Do not recommend a course simply because it is generally useful.
4. Consider the student's learning goal, skill level, and interests.
5. Arrange the selected courses in a sensible learning order.
6. If none of the provided courses are genuinely relevant, return an empty recommendations array.
7. Use the exact course ID and title provided.

Return ONLY valid JSON in this format:

{
  "recommendations": [
    {
      "courseId": "course-id",
      "courseTitle": "Course Name",
      "reason": "Short reason"
    }
  ]
}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response");
    }

    return JSON.parse(content);
  } catch (error) {
    console.error("Course recommendation error:", error);
    throw error;
  }
}

export async function recommendNextAction(
  topicTitle: string,
  score: number,
  totalQuestions: number,
  percentage: number
) {
  try {
    const prompt = `
You are a learning assistant.

A student has completed a quiz.

Topic: ${topicTitle}
Score: ${score}/${totalQuestions}
Percentage: ${percentage}%

Choose exactly ONE learning action from:

REVIEW
PRACTICE
RETAKE
NEXT_TOPIC

Guidelines:
- Very low score (<40%): REVIEW
- Medium score (40-60%): RETAKE
- Decent score (60-79%): PRACTICE
- High score (>=80%): NEXT_TOPIC

Return ONLY valid JSON in this format:
{
  "action": "REVIEW",
  "message": "Short explanation for the student"
}

The action must be exactly one of:
REVIEW, PRACTICE, RETAKE, NEXT_TOPIC
`;

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object"
      }
    });

    const content = response.choices[0]?.message?.content;

    if (content) {
      return parseJsonResponse(content);
    }
  } catch (err) {
    console.warn("Groq AI performance recommendation failed, using fallback:", err);
  }

  // Fallback rule-based action
  if (percentage >= 80) {
    return {
      action: "NEXT_TOPIC",
      message: `Excellent performance on ${topicTitle}! You're ready to advance to the next topic.`
    };
  } else if (percentage >= 60) {
    return {
      action: "PRACTICE",
      message: `Good effort! Practice a few more questions to master ${topicTitle}.`
    };
  } else if (percentage >= 40) {
    return {
      action: "RETAKE",
      message: `You're getting close! Retake the quiz for ${topicTitle} to improve your score.`
    };
  } else {
    return {
      action: "REVIEW",
      message: `We recommend reviewing the video resources for ${topicTitle} before trying again.`
    };
  }
}