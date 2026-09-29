import { PrismaClient } from "@prisma/client";
import { indexCourse } from "../services/courseVector.service";

const prisma = new PrismaClient();

async function main() {
  const course = await prisma.course.findUnique({
    where:{
      id:"fa383182-063b-4589-bfdc-f6d921c13bda"
    }
  });

  if (!course) {
    throw new Error("No courses found");
  }

  await indexCourse(course);

  console.log("Course indexed successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());