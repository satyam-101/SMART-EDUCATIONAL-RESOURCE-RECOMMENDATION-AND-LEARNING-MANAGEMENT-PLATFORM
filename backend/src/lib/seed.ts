import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const courses = [
  {
    title: "Basic Programming",
    description:
      "Learn programming fundamentals, variables, conditions, loops, functions and basic problem solving.",
    topics: [
      "Introduction to Programming",
      "Variables and Data Types",
      "Conditional Statements",
      "Loops",
      "Functions",
      "Arrays",
      "Basic Problem Solving"
    ]
  },
  {
    title: "Data Structures & Algorithms",
    description:
      "Learn important data structures and algorithms for programming and problem solving.",
    topics: [
      "Arrays",
      "Strings",
      "Linked Lists",
      "Stacks and Queues",
      "Trees",
      "Graphs",
      "Sorting",
      "Searching",
      "Dynamic Programming"
    ]
  },
  {
    title: "Frontend Development",
    description:
      "Learn the fundamentals of building modern web interfaces.",
    topics: [
      "HTML",
      "CSS",
      "JavaScript",
      "DOM",
      "React",
      "React Hooks",
      "Frontend Project"
    ]
  },
  {
    title: "Backend Development",
    description:
      "Learn backend development using APIs, databases and authentication.",
    topics: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "PostgreSQL",
      "Authentication",
      "Backend Project"
    ]
  }
];

async function main() {
  for (const courseData of courses) {
    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        topics: {
          create: courseData.topics.map((title, index) => ({
            title,
            order: index + 1
          }))
        }
      }
    });

    console.log(`Created course: ${course.title}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });