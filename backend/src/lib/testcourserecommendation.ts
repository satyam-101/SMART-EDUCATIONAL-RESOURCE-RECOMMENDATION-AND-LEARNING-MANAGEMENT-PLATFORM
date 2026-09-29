import { searchRelevantCourses } from "../services/courseRecommendation.service";

async function main() {
  const goal = "I want to be an full stack developer";
  const level = "Beginner";

  const results = await searchRelevantCourses(goal, level);

  console.log("\nRecommended courses:\n");

  for (const result of results) {
    console.log({
      result 
    });
  }
}

main().catch(console.error);