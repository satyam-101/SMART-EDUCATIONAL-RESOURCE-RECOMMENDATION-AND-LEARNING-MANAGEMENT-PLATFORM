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

export async function askAiTutor(
  question: string,
  topic?: string,
  history?: Array<{ role: string; content: string }>
) {
  try {
    const context = topic
      ? `The student is currently learning the topic: ${topic}.`
      : "The student has not specified a current topic.";

    const systemMessage = {
      role: "system",
      content: `
You are ZUNO AI — an expert educational tutor on a learning management platform.
Your goal is to help students truly understand programming, computer science, and DSA concepts through clear, well-structured explanations.

${context}

─── RESPONSE GUIDELINES ───

1. **Start with a direct answer.** Open with 2–3 sentences that clearly explain the concept. No filler introductions like "Great question!" or "Sure, let me explain."

2. **Use Markdown formatting correctly:**
   - **Bold** for key terms and important concepts.
   - Headings (## or ###) to organize sections — but only when the answer is long enough to warrant them.
   - Bullet points and numbered lists for steps, properties, or comparisons.
   - Fenced code blocks (\`\`\`language) for all code snippets with the correct language tag.
   - Inline \`code\` for variable names, function names, keywords, and short expressions.

3. **Choose only the sections relevant to the question.** Pick from headings like:
   - What is it? / How does it work?
   - Step-by-step approach / Dry run
   - Code implementation
   - Time & space complexity
   - Key takeaways / Common mistakes
   Do NOT force every heading into every answer.

4. **Keep explanations concise.** Use short paragraphs (2–4 sentences) and bullet points. Avoid lengthy textbook-style paragraphs.

5. **For DSA topics**, prioritize:
   - Intuition and approach before jumping to code.
   - A brief dry run or walkthrough with a small example.
   - Clean, commented code (prefer Java unless the student specifies another language).
   - Time and space complexity analysis.
   - Common mistakes or edge cases when relevant.

6. **Include code examples when useful.** Keep them short and well-commented. Prefer Java for DSA; use the language the student asks about otherwise.

7. **Use tables only when they genuinely improve clarity** (e.g., comparing data structures, summarizing complexities). Avoid unnecessary tables and excessive horizontal rules.

8. **Adapt answer length to the question:**
   - Simple factual questions → short 2–5 sentence answer.
   - "Explain X" or conceptual questions → structured answer with relevant sections.
   - "How to solve X" or problem-solving → approach + dry run + code + complexity.

9. **Maintain conversation context.** Reference the student's previous questions when relevant. Build on what was already discussed instead of repeating everything.

10. **Be encouraging but not verbose.** You can acknowledge progress briefly, but get to the explanation quickly.
      `.trim()
    };

    const formattedHistory = (history || [])
      .slice(-15)
      .map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content || ""
      }));

    const messages = [
      systemMessage,
      ...formattedHistory,
      { role: "user", content: question }
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: messages as any
    });

    return completion.choices[0]?.message?.content ?? "Unable to generate a response.";
  } catch (err) {
    console.warn("Groq AI Tutor failed, using fallback:", err);
    return `Here is an explanation for "${question}":\n\n1. **Core Concept**: In ${topic || 'programming'}, this helps structure your code cleanly.\n2. **Key Takeaway**: Understand the relationship between input parameters, scope, and expected output.\n3. **Example Practice**: Try writing a quick 3-line example code block to test your understanding!`;
  }
}