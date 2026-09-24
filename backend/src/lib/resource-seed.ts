import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resources = [
  {
    topic: "Introduction to Programming",
    videos: [
      {
        title: "Introduction to Programming",
        videoUrl: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
        description: "Learn the basics of programming and problem solving."
      },
      {
        title: "Programming Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=8PopR3x-VMY",
        description: "Understand basic programming concepts and how programs work."
      }
    ]
  },
  {
    topic: "Variables and Data Types",
    videos: [
      {
        title: "Variables and Data Types",
        videoUrl: "https://www.youtube.com/watch?v=WPvGqX-TXP0",
        description: "Learn variables, data types and storing values."
      },
      {
        title: "Programming Data Types",
        videoUrl: "https://www.youtube.com/watch?v=O2J3Y7VQ8zA",
        description: "Understand common data types used in programming."
      }
    ]
  },
  {
    topic: "Conditional Statements",
    videos: [
      {
        title: "Conditional Statements",
        videoUrl: "https://www.youtube.com/watch?v=Zp5MuPOtsSY",
        description: "Learn how conditions control program execution."
      },
      {
        title: "If Else Statements",
        videoUrl: "https://www.youtube.com/watch?v=IsG4Xd6LlsM",
        description: "Practice if, else-if and else conditions."
      }
    ]
  },
  {
    topic: "Loops",
    videos: [
      {
        title: "Loops in Programming",
        videoUrl: "https://www.youtube.com/watch?v=wxds6MAtUQ0",
        description: "Learn how loops are used to repeat operations."
      },
      {
        title: "For and While Loops",
        videoUrl: "https://www.youtube.com/watch?v=ssJY5MDLjlo",
        description: "Understand for and while loops with examples."
      }
    ]
  },
  {
    topic: "Functions",
    videos: [
      {
        title: "Functions in Programming",
        videoUrl: "https://www.youtube.com/watch?v=lfmg-EJ8gm4",
        description: "Learn how functions improve code reuse."
      },
      {
        title: "Functions and Parameters",
        videoUrl: "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        description: "Understand parameters, return values and function calls."
      }
    ]
  },

  {
    topic: "Arrays",
    videos: [
      {
        title: "Arrays Introduction",
        videoUrl: "https://www.youtube.com/watch?v=n60Dn0UsbEk",
        description: "Learn arrays and common array operations."
      },
      {
        title: "Array Problems",
        videoUrl: "https://www.youtube.com/watch?v=QJNwK2uJyGs",
        description: "Practice common array-based programming problems."
      }
    ]
  },
  {
    topic: "Strings",
    videos: [
      {
        title: "Strings in Data Structures",
        videoUrl: "https://www.youtube.com/watch?v=JTsoB7y1Q3E",
        description: "Learn string manipulation and common operations."
      },
      {
        title: "String Problems",
        videoUrl: "https://www.youtube.com/watch?v=H8kocPOTBv0",
        description: "Practice common string problems."
      }
    ]
  },
  {
    topic: "Linked Lists",
    videos: [
      {
        title: "Linked List Introduction",
        videoUrl: "https://www.youtube.com/watch?v=R9PTBwOzceo",
        description: "Understand nodes, links and linked-list traversal."
      },
      {
        title: "Linked List Operations",
        videoUrl: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
        description: "Learn insertion, deletion and traversal."
      }
    ]
  },
  {
    topic: "Stacks and Queues",
    videos: [
      {
        title: "Stacks and Queues",
        videoUrl: "https://www.youtube.com/watch?v=wjI1WNcIntg",
        description: "Learn the concepts of stacks and queues."
      },
      {
        title: "Stack and Queue Problems",
        videoUrl: "https://www.youtube.com/watch?v=GYptUgnIM_I",
        description: "Practice common stack and queue problems."
      }
    ]
  },
  {
    topic: "Trees",
    videos: [
      {
        title: "Tree Data Structure",
        videoUrl: "https://www.youtube.com/watch?v=oSWTXtMglKE",
        description: "Learn the basic structure and terminology of trees."
      },
      {
        title: "Binary Trees",
        videoUrl: "https://www.youtube.com/watch?v=H5JubkIy_p8",
        description: "Understand binary trees and tree traversal."
      }
    ]
  },
  {
    topic: "Graphs",
    videos: [
      {
        title: "Graph Data Structure",
        videoUrl: "https://www.youtube.com/watch?v=gXgEDyodOJU",
        description: "Learn vertices, edges and graph representation."
      },
      {
        title: "Graph Traversal",
        videoUrl: "https://www.youtube.com/watch?v=pcKY4hjDrxk",
        description: "Understand BFS and DFS graph traversal."
      }
    ]
  },
  {
    topic: "Sorting",
    videos: [
      {
        title: "Sorting Algorithms",
        videoUrl: "https://www.youtube.com/watch?v=kgBjXUE_Nwc",
        description: "Learn the purpose and basics of sorting algorithms."
      },
      {
        title: "Merge Sort",
        videoUrl: "https://www.youtube.com/watch?v=4VqmGXwpLqc",
        description: "Understand merge sort and its complexity."
      }
    ]
  },
  {
    topic: "Searching",
    videos: [
      {
        title: "Searching Algorithms",
        videoUrl: "https://www.youtube.com/watch?v=UxVSvxtY49k",
        description: "Learn linear and binary search."
      },
      {
        title: "Binary Search",
        videoUrl: "https://www.youtube.com/watch?v=P3YID7liBug",
        description: "Understand binary search and its complexity."
      }
    ]
  },
  {
    topic: "Dynamic Programming",
    videos: [
      {
        title: "Dynamic Programming Introduction",
        videoUrl: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
        description: "Learn the core ideas behind dynamic programming."
      },
      {
        title: "Dynamic Programming Patterns",
        videoUrl: "https://www.youtube.com/watch?v=Hdr64lKQ3e4",
        description: "Understand common approaches to DP problems."
      }
    ]
  },

  {
    topic: "HTML",
    videos: [
      {
        title: "HTML Full Course",
        videoUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
        description: "Learn HTML from the fundamentals."
      },
      {
        title: "HTML Basics",
        videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
        description: "Understand HTML elements and page structure."
      }
    ]
  },
  {
    topic: "CSS",
    videos: [
      {
        title: "CSS Full Course",
        videoUrl: "https://www.youtube.com/watch?v=OXGznpKZ_sA",
        description: "Learn CSS fundamentals and styling."
      },
      {
        title: "CSS Flexbox",
        videoUrl: "https://www.youtube.com/watch?v=phWxA89Dy94",
        description: "Learn how Flexbox is used for layouts."
      }
    ]
  },
  {
    topic: "JavaScript",
    videos: [
      {
        title: "JavaScript Full Course",
        videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        description: "Learn JavaScript fundamentals."
      },
      {
        title: "JavaScript Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
        description: "Understand core JavaScript concepts."
      }
    ]
  },
  {
    topic: "DOM",
    videos: [
      {
        title: "JavaScript DOM",
        videoUrl: "https://www.youtube.com/watch?v=5fb2aPlgoys",
        description: "Learn how JavaScript interacts with the DOM."
      },
      {
        title: "DOM Manipulation",
        videoUrl: "https://www.youtube.com/watch?v=y17RuWkWdn8",
        description: "Practice selecting and modifying DOM elements."
      }
    ]
  },
  {
    topic: "React",
    videos: [
      {
        title: "React Course",
        videoUrl: "https://www.youtube.com/watch?v=CgkZ7MvWUAA",
        description: "Learn React components, props and state."
      },
      {
        title: "React Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
        description: "Understand the fundamentals of React."
      }
    ]
  },
  {
    topic: "React Hooks",
    videos: [
      {
        title: "React Hooks",
        videoUrl: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
        description: "Learn the most commonly used React hooks."
      },
      {
        title: "useState and useEffect",
        videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
        description: "Understand state and side effects in React."
      }
    ]
  },
  {
    topic: "Frontend Project",
    videos: [
      {
        title: "Build a React Project",
        videoUrl: "https://www.youtube.com/watch?v=Rh3tobg7hEo",
        description: "Apply frontend concepts by building a project."
      },
      {
        title: "React Project Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=I2UBjN5ER4s",
        description: "Build a complete frontend project."
      }
    ]
  },

  {
    topic: "Node.js",
    videos: [
      {
        title: "Node.js Course",
        videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        description: "Learn Node.js and server-side JavaScript."
      },
      {
        title: "Node.js Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
        description: "Understand Node.js fundamentals."
      }
    ]
  },
  {
    topic: "Express.js",
    videos: [
      {
        title: "Express.js Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=SccSCuHhOw0",
        description: "Learn Express.js and backend routing."
      },
      {
        title: "Express.js Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
        description: "Understand middleware and Express routes."
      }
    ]
  },
  {
    topic: "REST APIs",
    videos: [
      {
        title: "REST API Tutorial",
        videoUrl: "https://www.youtube.com/watch?v=-MTSQjw5DrM",
        description: "Learn REST APIs and HTTP methods."
      },
      {
        title: "REST API Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=fgTGADljAeg",
        description: "Understand how clients communicate with APIs."
      }
    ]
  },
  {
    topic: "MongoDB",
    videos: [
      {
        title: "MongoDB Course",
        videoUrl: "https://www.youtube.com/watch?v=ofme2o29ngU",
        description: "Learn MongoDB and document databases."
      },
      {
        title: "MongoDB Fundamentals",
        videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
        description: "Understand collections and documents."
      }
    ]
  },
  {
    topic: "PostgreSQL",
    videos: [
      {
        title: "PostgreSQL Course",
        videoUrl: "https://www.youtube.com/watch?v=qw--VYLpxG4",
        description: "Learn PostgreSQL and relational database concepts."
      },
      {
        title: "PostgreSQL Basics",
        videoUrl: "https://www.youtube.com/watch?v=SpfIwlAYaKk",
        description: "Understand tables, queries and relationships."
      }
    ]
  },
  {
    topic: "Authentication",
    videos: [
      {
        title: "Authentication and Authorization",
        videoUrl: "https://www.youtube.com/watch?v=mbsmsi7l3r4",
        description: "Learn the fundamentals of authentication."
      },
      {
        title: "JWT Authentication",
        videoUrl: "https://www.youtube.com/watch?v=7Q17ubqLfaM",
        description: "Understand token-based authentication using JWT."
      }
    ]
  },
  {
    topic: "Backend Project",
    videos: [
      {
        title: "Build a Node.js Backend",
        videoUrl: "https://www.youtube.com/watch?v=VrQgmNY96wo",
        description: "Apply backend concepts by building an API."
      },
      {
        title: "Node.js API Project",
        videoUrl: "https://www.youtube.com/watch?v=fgTGADljAeg",
        description: "Practice building a backend project."
      }
    ]
  }
];

async function main() {
  for (const resourceGroup of resources) {
    const topic = await prisma.topic.findFirst({
      where: {
        title: resourceGroup.topic
      }
    });

    if (!topic) {
      console.log(`Topic not found: ${resourceGroup.topic}`);
      continue;
    }

    for (const video of resourceGroup.videos) {
      const existingResource = await prisma.resource.findFirst({
        where: {
          topicId: topic.id,
          videoUrl: video.videoUrl
        }
      });

      if (existingResource) {
        console.log(`Resource already exists: ${video.title}`);
        continue;
      }

      await prisma.resource.create({
        data: {
          title: video.title,
          videoUrl: video.videoUrl,
          description: video.description,
          topicId: topic.id
        }
      });

      console.log(`Created resource: ${video.title}`);
    }
  }

  console.log("Resource seeding completed.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });