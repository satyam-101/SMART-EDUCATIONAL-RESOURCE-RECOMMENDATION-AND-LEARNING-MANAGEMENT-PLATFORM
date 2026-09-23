import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
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
  const prompt = `
You are an educational course recommendation assistant.

The available courses are:
1. Basic Programming
2. Data Structures & Algorithms
3. Frontend Development
4. Backend Development

Student information:
Learning goal: ${learningGoal}
Skill level: ${skillLevel}
Interests: ${interests}

Recommend the most relevant courses from ONLY the available courses.

Return ONLY valid JSON in this format:
{
  "recommendations": [
    {
      "courseTitle": "Course Name",
      "reason": "Short reason"
    }
  ]
}

Do not recommend courses that are not in the available course list.
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
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

  if (!content) {
    throw new Error("No response from Groq");
  }

  return parseJsonResponse(content);
}

export async function recommendNextAction(
  topicTitle: string,
  score: number,
  totalQuestions: number,
  percentage: number
) {
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
- Very low score: REVIEW
- Low or medium score: PRACTICE or RETAKE
- Good score: NEXT_TOPIC

Return ONLY valid JSON in this format:
{
  "action": "REVIEW",
  "message": "Short explanation for the student"
}

The action must be exactly one of:
REVIEW, PRACTICE, RETAKE, NEXT_TOPIC
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
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

  if (!content) {
    throw new Error("No response from Groq");
  }

  return parseJsonResponse(content);
}