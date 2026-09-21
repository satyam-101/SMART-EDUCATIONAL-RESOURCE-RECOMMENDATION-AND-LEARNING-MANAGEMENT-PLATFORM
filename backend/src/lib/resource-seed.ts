import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const topics = await prisma.topic.findMany();

  for (const topic of topics) {
    await prisma.resource.createMany({
      data: [
        {
          title: `${topic.title} - Video 1`,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: `Introduction to ${topic.title}`,
          topicId: topic.id
        },
        {
          title: `${topic.title} - Video 2`,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: `Another explanation of ${topic.title}`,
          topicId: topic.id
        }
      ]
    });

    console.log(`Added resources to: ${topic.title}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });