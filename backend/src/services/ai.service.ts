import Groq from "groq-sdk";

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
    console.warn("Groq AI recommendation failed, using fallback:", err);
  }

  // Smart Fallback based on user profile
  const goalLower = (learningGoal + " " + interests).toLowerCase();
  const recs = [];

  if (goalLower.includes("frontend") || goalLower.includes("react") || goalLower.includes("web") || goalLower.includes("javascript")) {
    recs.push({
      courseTitle: "Frontend Development",
      reason: "Matches your goal to learn web interfaces, React, and JavaScript."
    });
  }
  if (goalLower.includes("backend") || goalLower.includes("node") || goalLower.includes("database") || goalLower.includes("api")) {
    recs.push({
      courseTitle: "Backend Development",
      reason: "Great match for building APIs, server logic, and managing databases."
    });
  }
  if (goalLower.includes("dsa") || goalLower.includes("algorithm") || goalLower.includes("problem") || skillLevel === "Intermediate" || skillLevel === "Advanced") {
    recs.push({
      courseTitle: "Data Structures & Algorithms",
      reason: "Recommended to strengthen core problem-solving and computer science fundamentals."
    });
  }

  if (recs.length === 0) {
    recs.push({
      courseTitle: "Basic Programming",
      reason: "Ideal starting point to build a strong foundation in programming concepts."
    });
    recs.push({
      courseTitle: "Frontend Development",
      reason: "Popular track for building interactive web applications."
    });
  }

  return { recommendations: recs };
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