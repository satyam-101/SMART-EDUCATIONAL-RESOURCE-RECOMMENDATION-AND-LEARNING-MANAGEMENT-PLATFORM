import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const topic = await prisma.topic.findFirst({
    where: {
      title: "Arrays"
    }
  });

  if (!topic) {
    console.log("Arrays topic not found. Run npm run seed first.");
    return;
  }

  const existingQuiz = await prisma.quiz.findUnique({
    where: {
      topicId: topic.id
    }
  });

  if (existingQuiz) {
    console.log("Arrays quiz already exists.");
    return;
  }

  await prisma.quiz.create({
    data: {
      title: "Arrays Quiz",
      topicId: topic.id,

      questions: {
        create: [
          {
            questionText:
              "Which data structure stores elements in contiguous memory?",
            optionA: "Array",
            optionB: "Linked List",
            optionC: "Tree",
            optionD: "Graph",
            correctAnswer: "A"
          },
          {
            questionText:
              "What is the index of the first element in a zero-based array?",
            optionA: "0",
            optionB: "1",
            optionC: "-1",
            optionD: "Depends",
            correctAnswer: "A"
          },
          {
            questionText:
              "What is the time complexity of accessing an array element by index?",
            optionA: "O(1)",
            optionB: "O(n)",
            optionC: "O(log n)",
            optionD: "O(n log n)",
            correctAnswer: "A"
          },
          {
            questionText:
              "Which operation usually requires shifting elements in an array?",
            optionA: "Accessing an element",
            optionB: "Insertion in the middle",
            optionC: "Reading the first element",
            optionD: "Checking the length",
            correctAnswer: "B"
          },
          {
            questionText:
              "Which of these is NOT a typical property of an array?",
            optionA: "Indexed access",
            optionB: "Elements stored at positions",
            optionC: "Random access",
            optionD: "Nodes connected by pointers",
            correctAnswer: "D"
          }
        ]
      }
    }
  });

  console.log("Arrays quiz created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });