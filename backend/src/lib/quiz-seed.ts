import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quizQuestions: Record<
  string,
  {
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
  }[]
> = {
  "Introduction to Programming": [
    {
      questionText: "What is an algorithm?",
      optionA: "A programming language",
      optionB: "A step-by-step procedure to solve a problem",
      optionC: "A database",
      optionD: "A compiler",
      correctAnswer: "B"
    },
    {
      questionText: "Which of these is a programming language?",
      optionA: "Java",
      optionB: "HTML",
      optionC: "HTTP",
      optionD: "SQL Server",
      correctAnswer: "A"
    },
    {
      questionText: "What does a compiler do?",
      optionA: "Stores data",
      optionB: "Converts source code into machine/executable code",
      optionC: "Creates databases",
      optionD: "Connects to the internet",
      correctAnswer: "B"
    },
    {
      questionText: "Which symbol is commonly used to represent assignment?",
      optionA: "=",
      optionB: "==",
      optionC: "!=",
      optionD: ">",
      correctAnswer: "A"
    },
    {
      questionText: "What is a variable?",
      optionA: "A fixed value that cannot change",
      optionB: "A named storage location for data",
      optionC: "A type of loop",
      optionD: "A function only",
      correctAnswer: "B"
    }
  ],

  "Variables and Data Types": [
    {
      questionText: "Which data type is commonly used to store whole numbers?",
      optionA: "Integer",
      optionB: "Boolean",
      optionC: "Character",
      optionD: "String",
      correctAnswer: "A"
    },
    {
      questionText: "Which data type stores true or false?",
      optionA: "String",
      optionB: "Boolean",
      optionC: "Integer",
      optionD: "Float",
      correctAnswer: "B"
    },
    {
      questionText: "What is a string?",
      optionA: "A collection of characters",
      optionB: "A number",
      optionC: "A loop",
      optionD: "A condition",
      correctAnswer: "A"
    },
    {
      questionText: "Which type is suitable for decimal numbers?",
      optionA: "Boolean",
      optionB: "Character",
      optionC: "Floating-point",
      optionD: "Integer",
      correctAnswer: "C"
    },
    {
      questionText: "Why are variables used?",
      optionA: "To store and work with values",
      optionB: "To create hardware",
      optionC: "To connect networks",
      optionD: "To compile databases",
      correctAnswer: "A"
    }
  ],

  "Conditional Statements": [
    {
      questionText: "Which statement is used to make a decision based on a condition?",
      optionA: "if",
      optionB: "for",
      optionC: "class",
      optionD: "import",
      correctAnswer: "A"
    },
    {
      questionText: "What does an else block execute?",
      optionA: "Always",
      optionB: "When the if condition is false",
      optionC: "Before if",
      optionD: "Only inside a loop",
      correctAnswer: "B"
    },
    {
      questionText: "Which operator checks equality in Java?",
      optionA: "=",
      optionB: "==",
      optionC: "!=",
      optionD: "=>",
      correctAnswer: "B"
    },
    {
      questionText: "Which operator means NOT equal?",
      optionA: "==",
      optionB: "=",
      optionC: "!=",
      optionD: "<=",
      correctAnswer: "C"
    },
    {
      questionText: "What is a nested if?",
      optionA: "An if statement inside another if statement",
      optionB: "An if statement outside a program",
      optionC: "A loop",
      optionD: "A function",
      correctAnswer: "A"
    }
  ],

  "Loops": [
    {
      questionText: "Which loop is commonly used when the number of iterations is known?",
      optionA: "for",
      optionB: "if",
      optionC: "switch",
      optionD: "class",
      correctAnswer: "A"
    },
    {
      questionText: "Which loop continues while a condition is true?",
      optionA: "while",
      optionB: "if",
      optionC: "switch",
      optionD: "return",
      correctAnswer: "A"
    },
    {
      questionText: "What does break do inside a loop?",
      optionA: "Skips one iteration",
      optionB: "Terminates the loop",
      optionC: "Restarts the loop",
      optionD: "Creates a loop",
      correctAnswer: "B"
    },
    {
      questionText: "What does continue generally do?",
      optionA: "Stops the program",
      optionB: "Skips the current iteration",
      optionC: "Ends the loop permanently",
      optionD: "Creates a function",
      correctAnswer: "B"
    },
    {
      questionText: "What happens if a loop condition never becomes false?",
      optionA: "Syntax error",
      optionB: "Infinite loop",
      optionC: "Compilation always stops",
      optionD: "Nothing",
      correctAnswer: "B"
    }
  ],

  "Functions": [
    {
      questionText: "What is a function?",
      optionA: "A reusable block of code",
      optionB: "A database",
      optionC: "A variable only",
      optionD: "A hardware component",
      correctAnswer: "A"
    },
    {
      questionText: "Why are functions useful?",
      optionA: "They improve code reuse",
      optionB: "They remove variables",
      optionC: "They replace databases",
      optionD: "They prevent compilation",
      correctAnswer: "A"
    },
    {
      questionText: "What is a parameter?",
      optionA: "A value received by a function",
      optionB: "A database table",
      optionC: "A loop",
      optionD: "A compiler",
      correctAnswer: "A"
    },
    {
      questionText: "What does return usually do?",
      optionA: "Returns a value from a function",
      optionB: "Starts a loop",
      optionC: "Creates a variable",
      optionD: "Deletes the function",
      correctAnswer: "A"
    },
    {
      questionText: "Can a function be called multiple times?",
      optionA: "Yes",
      optionB: "No",
      optionC: "Only once",
      optionD: "Only inside loops",
      correctAnswer: "A"
    }
  ],

  "Arrays": [
    {
      questionText: "Which data structure stores elements in contiguous memory?",
      optionA: "Array",
      optionB: "Linked List",
      optionC: "Tree",
      optionD: "Graph",
      correctAnswer: "A"
    },
    {
      questionText: "What is the index of the first element in a zero-based array?",
      optionA: "0",
      optionB: "1",
      optionC: "-1",
      optionD: "Depends",
      correctAnswer: "A"
    },
    {
      questionText: "What is the time complexity of accessing an array element by index?",
      optionA: "O(1)",
      optionB: "O(n)",
      optionC: "O(log n)",
      optionD: "O(n log n)",
      correctAnswer: "A"
    },
    {
      questionText: "Which operation usually requires shifting elements in an array?",
      optionA: "Accessing an element",
      optionB: "Insertion in the middle",
      optionC: "Reading the first element",
      optionD: "Checking the length",
      correctAnswer: "B"
    },
    {
      questionText: "Which is NOT a typical property of an array?",
      optionA: "Indexed access",
      optionB: "Elements stored at positions",
      optionC: "Random access",
      optionD: "Nodes connected by pointers",
      correctAnswer: "D"
    }
  ],

  "Basic Problem Solving": [
    {
      questionText: "What should you usually identify first when solving a programming problem?",
      optionA: "The input and output",
      optionB: "The UI color",
      optionC: "The database server",
      optionD: "The framework",
      correctAnswer: "A"
    },
    {
      questionText: "What is a brute-force solution?",
      optionA: "Trying all possible relevant solutions",
      optionB: "Using no code",
      optionC: "Using only recursion",
      optionD: "Using a database",
      correctAnswer: "A"
    },
    {
      questionText: "Why is complexity analysis important?",
      optionA: "To understand resource usage",
      optionB: "To choose colors",
      optionC: "To design UI",
      optionD: "To write HTML",
      correctAnswer: "A"
    },
    {
      questionText: "What does debugging mean?",
      optionA: "Finding and fixing errors",
      optionB: "Writing documentation only",
      optionC: "Creating a database",
      optionD: "Deploying an application",
      correctAnswer: "A"
    },
    {
      questionText: "What is an edge case?",
      optionA: "An unusual or boundary input",
      optionB: "A normal input only",
      optionC: "A programming language",
      optionD: "A database",
      correctAnswer: "A"
    }
  ],
    "Strings": [
    {
      questionText: "Which data structure is commonly used to represent a sequence of characters?",
      optionA: "String",
      optionB: "Tree",
      optionC: "Graph",
      optionD: "Heap",
      correctAnswer: "A"
    },
    {
      questionText: "What is the index of the first character in a zero-based string?",
      optionA: "0",
      optionB: "1",
      optionC: "-1",
      optionD: "Depends",
      correctAnswer: "A"
    },
    {
      questionText: "What is the time complexity of checking every character in a string of length n?",
      optionA: "O(1)",
      optionB: "O(log n)",
      optionC: "O(n)",
      optionD: "O(n²)",
      correctAnswer: "C"
    },
    {
      questionText: "Which operation combines two strings?",
      optionA: "Concatenation",
      optionB: "Traversal",
      optionC: "Hashing",
      optionD: "Sorting",
      correctAnswer: "A"
    },
    {
      questionText: "What does string reversal mean?",
      optionA: "Changing all characters",
      optionB: "Reading characters in reverse order",
      optionC: "Deleting the string",
      optionD: "Sorting characters alphabetically",
      correctAnswer: "B"
    }
  ],

  "Linked Lists": [
    {
      questionText: "What does a linked-list node typically contain?",
      optionA: "Only data",
      optionB: "Data and a link/reference",
      optionC: "Only an index",
      optionD: "Only a pointer",
      correctAnswer: "B"
    },
    {
      questionText: "What is the first node of a linked list commonly called?",
      optionA: "Tail",
      optionB: "Root",
      optionC: "Head",
      optionD: "Parent",
      correctAnswer: "C"
    },
    {
      questionText: "What is the time complexity of accessing the kth element in a singly linked list?",
      optionA: "O(1)",
      optionB: "O(log n)",
      optionC: "O(k)",
      optionD: "O(n²)",
      correctAnswer: "C"
    },
    {
      questionText: "What does the last node of a singly linked list usually point to?",
      optionA: "Head",
      optionB: "Previous node",
      optionC: "Null",
      optionD: "Root",
      correctAnswer: "C"
    },
    {
      questionText: "Which operation is efficient at the beginning of a linked list?",
      optionA: "Insertion",
      optionB: "Random access",
      optionC: "Binary search",
      optionD: "Index lookup",
      correctAnswer: "A"
    }
  ],

  "Stacks and Queues": [
    {
      questionText: "Which principle does a stack follow?",
      optionA: "FIFO",
      optionB: "LIFO",
      optionC: "Random order",
      optionD: "Sorted order",
      correctAnswer: "B"
    },
    {
      questionText: "Which principle does a queue follow?",
      optionA: "LIFO",
      optionB: "FIFO",
      optionC: "Random order",
      optionD: "Reverse order",
      correctAnswer: "B"
    },
    {
      questionText: "Which operation adds an element to a stack?",
      optionA: "Push",
      optionB: "Pop",
      optionC: "Dequeue",
      optionD: "Peek",
      correctAnswer: "A"
    },
    {
      questionText: "Which operation removes an element from a queue?",
      optionA: "Push",
      optionB: "Pop",
      optionC: "Dequeue",
      optionD: "Insert",
      correctAnswer: "C"
    },
    {
      questionText: "Which data structure is commonly used for function call management?",
      optionA: "Queue",
      optionB: "Stack",
      optionC: "Graph",
      optionD: "Heap",
      correctAnswer: "B"
    }
  ],

  "Trees": [
    {
      questionText: "What is the top node of a tree called?",
      optionA: "Leaf",
      optionB: "Root",
      optionC: "Edge",
      optionD: "Child",
      correctAnswer: "B"
    },
    {
      questionText: "What is a node with no children called?",
      optionA: "Root",
      optionB: "Parent",
      optionC: "Leaf",
      optionD: "Branch",
      correctAnswer: "C"
    },
    {
      questionText: "How many children can a binary tree node have at most?",
      optionA: "1",
      optionB: "2",
      optionC: "3",
      optionD: "Unlimited",
      correctAnswer: "B"
    },
    {
      questionText: "Which traversal visits the root between the left and right subtrees?",
      optionA: "Preorder",
      optionB: "Inorder",
      optionC: "Postorder",
      optionD: "Level order",
      correctAnswer: "B"
    },
    {
      questionText: "What connects two nodes in a tree?",
      optionA: "Edge",
      optionB: "Array",
      optionC: "Index",
      optionD: "Queue",
      correctAnswer: "A"
    }
  ],

  "Graphs": [
    {
      questionText: "What are the two main components of a graph?",
      optionA: "Arrays and strings",
      optionB: "Vertices and edges",
      optionC: "Roots and leaves",
      optionD: "Stacks and queues",
      correctAnswer: "B"
    },
    {
      questionText: "What does an edge represent?",
      optionA: "A connection between vertices",
      optionB: "A vertex itself",
      optionC: "A queue",
      optionD: "An array index",
      correctAnswer: "A"
    },
    {
      questionText: "Which algorithm is commonly used for breadth-first traversal?",
      optionA: "BFS",
      optionB: "DFS",
      optionC: "Binary Search",
      optionD: "Merge Sort",
      correctAnswer: "A"
    },
    {
      questionText: "Which data structure is commonly used by BFS?",
      optionA: "Stack",
      optionB: "Queue",
      optionC: "Heap only",
      optionD: "Array only",
      correctAnswer: "B"
    },
    {
      questionText: "Which traversal explores as far as possible before backtracking?",
      optionA: "BFS",
      optionB: "DFS",
      optionC: "Binary Search",
      optionD: "Selection Sort",
      correctAnswer: "B"
    }
  ],

  "Sorting": [
    {
      questionText: "What is the goal of sorting?",
      optionA: "Arrange elements according to an order",
      optionB: "Delete elements",
      optionC: "Duplicate elements",
      optionD: "Encrypt elements",
      correctAnswer: "A"
    },
    {
      questionText: "Which sorting algorithm repeatedly compares adjacent elements?",
      optionA: "Bubble Sort",
      optionB: "Binary Search",
      optionC: "DFS",
      optionD: "BFS",
      correctAnswer: "A"
    },
    {
      questionText: "What is the average time complexity of Merge Sort?",
      optionA: "O(1)",
      optionB: "O(log n)",
      optionC: "O(n log n)",
      optionD: "O(n²)",
      correctAnswer: "C"
    },
    {
      questionText: "Which sorting algorithm uses a pivot?",
      optionA: "Quick Sort",
      optionB: "Bubble Sort",
      optionC: "Selection Sort",
      optionD: "Linear Search",
      correctAnswer: "A"
    },
    {
      questionText: "What is the worst-case time complexity of Bubble Sort?",
      optionA: "O(1)",
      optionB: "O(log n)",
      optionC: "O(n)",
      optionD: "O(n²)",
      correctAnswer: "D"
    }
  ],

  "Searching": [
    {
      questionText: "What does searching mean?",
      optionA: "Finding a required element",
      optionB: "Sorting elements",
      optionC: "Deleting elements",
      optionD: "Creating elements",
      correctAnswer: "A"
    },
    {
      questionText: "What is the time complexity of linear search in the worst case?",
      optionA: "O(1)",
      optionB: "O(log n)",
      optionC: "O(n)",
      optionD: "O(n log n)",
      correctAnswer: "C"
    },
    {
      questionText: "Binary search requires what property?",
      optionA: "The data must be sorted",
      optionB: "The data must be random",
      optionC: "The data must contain strings",
      optionD: "The data must be a graph",
      correctAnswer: "A"
    },
    {
      questionText: "What is the time complexity of binary search?",
      optionA: "O(n)",
      optionB: "O(log n)",
      optionC: "O(n²)",
      optionD: "O(1) always",
      correctAnswer: "B"
    },
    {
      questionText: "What does binary search do after comparing with the middle element?",
      optionA: "Checks both halves every time",
      optionB: "Eliminates one half of the search space",
      optionC: "Sorts the array",
      optionD: "Deletes the middle element",
      correctAnswer: "B"
    }
  ],

  "Dynamic Programming": [
    {
      questionText: "What is a key idea behind dynamic programming?",
      optionA: "Solving and reusing overlapping subproblems",
      optionB: "Always using recursion without storing results",
      optionC: "Sorting data",
      optionD: "Using graphs only",
      correctAnswer: "A"
    },
    {
      questionText: "What does memoization mean?",
      optionA: "Storing results of previously solved subproblems",
      optionB: "Deleting previous results",
      optionC: "Sorting a table",
      optionD: "Creating random values",
      correctAnswer: "A"
    },
    {
      questionText: "Which property is commonly associated with DP problems?",
      optionA: "Overlapping subproblems",
      optionB: "Only sorted input",
      optionC: "No repeated calculations",
      optionD: "Only graph input",
      correctAnswer: "A"
    },
    {
      questionText: "What is tabulation?",
      optionA: "Bottom-up dynamic programming",
      optionB: "Top-down recursion only",
      optionC: "Graph traversal",
      optionD: "Sorting",
      correctAnswer: "A"
    },
    {
      questionText: "Why does DP improve many recursive solutions?",
      optionA: "It avoids recalculating the same subproblems",
      optionB: "It removes all loops",
      optionC: "It always gives O(1)",
      optionD: "It removes input",
      correctAnswer: "A"
    }
  ],
    "HTML": [
    {
      questionText: "What does HTML stand for?",
      optionA: "Hyper Text Markup Language",
      optionB: "High Text Machine Language",
      optionC: "Hyper Transfer Markup Language",
      optionD: "Home Tool Markup Language",
      correctAnswer: "A"
    },
    {
      questionText: "Which tag is used for the main heading?",
      optionA: "<h1>",
      optionB: "<head>",
      optionC: "<heading>",
      optionD: "<title>",
      correctAnswer: "A"
    },
    {
      questionText: "Which tag creates a hyperlink?",
      optionA: "<link>",
      optionB: "<a>",
      optionC: "<href>",
      optionD: "<url>",
      correctAnswer: "B"
    },
    {
      questionText: "Which tag is used to display an image?",
      optionA: "<image>",
      optionB: "<picture>",
      optionC: "<img>",
      optionD: "<src>",
      correctAnswer: "C"
    },
    {
      questionText: "What is HTML primarily used for?",
      optionA: "Structuring web pages",
      optionB: "Managing databases",
      optionC: "Styling only",
      optionD: "Running servers",
      correctAnswer: "A"
    }
  ],

  "CSS": [
    {
      questionText: "What does CSS stand for?",
      optionA: "Cascading Style Sheets",
      optionB: "Computer Style System",
      optionC: "Creative Style Syntax",
      optionD: "Cascading System Styles",
      correctAnswer: "A"
    },
    {
      questionText: "What is CSS mainly used for?",
      optionA: "Styling web pages",
      optionB: "Creating databases",
      optionC: "Writing server logic",
      optionD: "Managing APIs",
      correctAnswer: "A"
    },
    {
      questionText: "Which property changes text color?",
      optionA: "font",
      optionB: "color",
      optionC: "text-color",
      optionD: "background",
      correctAnswer: "B"
    },
    {
      questionText: "Which CSS layout system is commonly used for one-dimensional layouts?",
      optionA: "Flexbox",
      optionB: "SQL",
      optionC: "DOM",
      optionD: "HTTP",
      correctAnswer: "A"
    },
    {
      questionText: "Which property controls the space inside an element?",
      optionA: "margin",
      optionB: "padding",
      optionC: "border",
      optionD: "gap",
      correctAnswer: "B"
    }
  ],

  "JavaScript": [
    {
      questionText: "What type of language is JavaScript?",
      optionA: "Programming language",
      optionB: "Database",
      optionC: "Markup language",
      optionD: "Operating system",
      correctAnswer: "A"
    },
    {
      questionText: "Which keyword declares a block-scoped variable?",
      optionA: "var",
      optionB: "let",
      optionC: "define",
      optionD: "variable",
      correctAnswer: "B"
    },
    {
      questionText: "Which value represents a boolean true value?",
      optionA: "yes",
      optionB: "1",
      optionC: "true",
      optionD: "TrueValue",
      correctAnswer: "C"
    },
    {
      questionText: "Which method converts JSON text into a JavaScript object?",
      optionA: "JSON.parse()",
      optionB: "JSON.convert()",
      optionC: "JSON.object()",
      optionD: "JSON.read()",
      correctAnswer: "A"
    },
    {
      questionText: "What is a function used for?",
      optionA: "Reusable code",
      optionB: "Only styling",
      optionC: "Database storage",
      optionD: "HTML parsing only",
      correctAnswer: "A"
    }
  ],

  "DOM": [
    {
      questionText: "What does DOM stand for?",
      optionA: "Document Object Model",
      optionB: "Data Object Management",
      optionC: "Document Oriented Model",
      optionD: "Digital Object Model",
      correctAnswer: "A"
    },
    {
      questionText: "What does the DOM represent?",
      optionA: "The structure of an HTML document",
      optionB: "A database",
      optionC: "A server",
      optionD: "A CSS file",
      correctAnswer: "A"
    },
    {
      questionText: "Which method selects an element by its ID?",
      optionA: "getElementById()",
      optionB: "getById()",
      optionC: "selectId()",
      optionD: "findId()",
      correctAnswer: "A"
    },
    {
      questionText: "What can JavaScript do through the DOM?",
      optionA: "Modify webpage content",
      optionB: "Create a database automatically",
      optionC: "Compile Java",
      optionD: "Install an operating system",
      correctAnswer: "A"
    },
    {
      questionText: "What is an event in the DOM?",
      optionA: "An action such as a click",
      optionB: "A database table",
      optionC: "A CSS property",
      optionD: "A server",
      correctAnswer: "A"
    }
  ],

  "React": [
    {
      questionText: "What is React?",
      optionA: "A JavaScript library for building user interfaces",
      optionB: "A database",
      optionC: "A backend server",
      optionD: "An operating system",
      correctAnswer: "A"
    },
    {
      questionText: "What is a React component?",
      optionA: "A reusable UI building block",
      optionB: "A database table",
      optionC: "A server",
      optionD: "A CSS property",
      correctAnswer: "A"
    },
    {
      questionText: "Which syntax is commonly used to write UI inside JavaScript?",
      optionA: "JSX",
      optionB: "SQL",
      optionC: "XML only",
      optionD: "JDBC",
      correctAnswer: "A"
    },
    {
      questionText: "What is a prop in React?",
      optionA: "Data passed to a component",
      optionB: "A database",
      optionC: "A server route",
      optionD: "A CSS class",
      correctAnswer: "A"
    },
    {
      questionText: "What is state used for?",
      optionA: "Managing changing component data",
      optionB: "Creating databases",
      optionC: "Styling HTML",
      optionD: "Managing DNS",
      correctAnswer: "A"
    }
  ],

  "React Hooks": [
    {
      questionText: "Which hook is commonly used to manage state?",
      optionA: "useState",
      optionB: "useStyle",
      optionC: "useData",
      optionD: "useValueOnly",
      correctAnswer: "A"
    },
    {
      questionText: "Which hook is commonly used for side effects?",
      optionA: "useEffect",
      optionB: "useSideEffectOnly",
      optionC: "useAction",
      optionD: "useEvent",
      correctAnswer: "A"
    },
    {
      questionText: "Can hooks be used inside React function components?",
      optionA: "Yes",
      optionB: "No",
      optionC: "Only in HTML",
      optionD: "Only in CSS",
      correctAnswer: "A"
    },
    {
      questionText: "What does useState return?",
      optionA: "State value and a state update function",
      optionB: "Only a value",
      optionC: "Only a function",
      optionD: "A component",
      correctAnswer: "A"
    },
    {
      questionText: "What is the dependency array commonly associated with?",
      optionA: "useEffect",
      optionB: "useState",
      optionC: "useRef only",
      optionD: "JSX",
      correctAnswer: "A"
    }
  ],

  "Frontend Project": [
    {
      questionText: "What is the purpose of a frontend project?",
      optionA: "Build the user-facing part of an application",
      optionB: "Only manage databases",
      optionC: "Only configure servers",
      optionD: "Only write SQL",
      correctAnswer: "A"
    },
    {
      questionText: "Which technology is commonly used to style web pages?",
      optionA: "CSS",
      optionB: "PostgreSQL",
      optionC: "JWT",
      optionD: "Node.js",
      correctAnswer: "A"
    },
    {
      questionText: "Which technology can be used to build component-based UIs?",
      optionA: "React",
      optionB: "MongoDB",
      optionC: "Express",
      optionD: "PostgreSQL",
      correctAnswer: "A"
    },
    {
      questionText: "Why is responsive design important?",
      optionA: "To support different screen sizes",
      optionB: "To store passwords",
      optionC: "To create APIs",
      optionD: "To query databases",
      correctAnswer: "A"
    },
    {
      questionText: "What does an API allow a frontend to do?",
      optionA: "Communicate with backend services",
      optionB: "Replace HTML",
      optionC: "Replace CSS",
      optionD: "Compile Java",
      correctAnswer: "A"
    }
  ],

  "Node.js": [
    {
      questionText: "What is Node.js?",
      optionA: "A JavaScript runtime",
      optionB: "A database",
      optionC: "A CSS framework",
      optionD: "An operating system",
      correctAnswer: "A"
    },
    {
      questionText: "Where is Node.js commonly used?",
      optionA: "Backend/server-side applications",
      optionB: "Only CSS",
      optionC: "Only databases",
      optionD: "Only image editing",
      correctAnswer: "A"
    },
    {
      questionText: "Which package manager is commonly used with Node.js?",
      optionA: "npm",
      optionB: "pip",
      optionC: "maven",
      optionD: "gradle",
      correctAnswer: "A"
    },
    {
      questionText: "What file commonly contains Node.js project dependencies?",
      optionA: "package.json",
      optionB: "index.html",
      optionC: "database.sql",
      optionD: "style.css",
      correctAnswer: "A"
    },
    {
      questionText: "What does npm install generally do?",
      optionA: "Installs project dependencies",
      optionB: "Deletes the project",
      optionC: "Starts PostgreSQL",
      optionD: "Creates HTML",
      correctAnswer: "A"
    }
  ],

  "Express.js": [
    {
      questionText: "What is Express.js?",
      optionA: "A Node.js web framework",
      optionB: "A database",
      optionC: "A frontend library",
      optionD: "A programming language",
      correctAnswer: "A"
    },
    {
      questionText: "What is a route in Express?",
      optionA: "An endpoint that handles a request",
      optionB: "A database table",
      optionC: "A CSS class",
      optionD: "A React component",
      correctAnswer: "A"
    },
    {
      questionText: "Which method handles GET requests?",
      optionA: "app.get()",
      optionB: "app.fetch()",
      optionC: "app.read()",
      optionD: "app.request()",
      correctAnswer: "A"
    },
    {
      questionText: "What is middleware?",
      optionA: "A function that runs during the request-response cycle",
      optionB: "A database",
      optionC: "A frontend component",
      optionD: "A CSS property",
      correctAnswer: "A"
    },
    {
      questionText: "Which method is commonly used to send JSON responses?",
      optionA: "res.json()",
      optionB: "res.data()",
      optionC: "res.sendJSONOnly()",
      optionD: "res.object()",
      correctAnswer: "A"
    }
  ],

  "REST APIs": [
    {
      questionText: "What does REST stand for?",
      optionA: "Representational State Transfer",
      optionB: "Remote Execution State Transfer",
      optionC: "Resource Execution System Technology",
      optionD: "Request Exchange Standard Type",
      correctAnswer: "A"
    },
    {
      questionText: "Which HTTP method is commonly used to retrieve data?",
      optionA: "GET",
      optionB: "POST",
      optionC: "DELETE",
      optionD: "PATCH",
      correctAnswer: "A"
    },
    {
      questionText: "Which HTTP method is commonly used to create data?",
      optionA: "GET",
      optionB: "POST",
      optionC: "DELETE",
      optionD: "HEAD",
      correctAnswer: "B"
    },
    {
      questionText: "Which HTTP status code means 'Not Found'?",
      optionA: "200",
      optionB: "201",
      optionC: "404",
      optionD: "500",
      correctAnswer: "C"
    },
    {
      questionText: "Which format is commonly used for API request and response data?",
      optionA: "JSON",
      optionB: "CSS",
      optionC: "PNG",
      optionD: "EXE",
      correctAnswer: "A"
    }
  ],

  "MongoDB": [
    {
      questionText: "What type of database is MongoDB?",
      optionA: "NoSQL document database",
      optionB: "Relational database",
      optionC: "Graph-only database",
      optionD: "File system",
      correctAnswer: "A"
    },
    {
      questionText: "What format is commonly associated with MongoDB documents?",
      optionA: "JSON-like documents",
      optionB: "CSV only",
      optionC: "HTML",
      optionD: "XML only",
      correctAnswer: "A"
    },
    {
      questionText: "What is a MongoDB collection similar to in a relational database?",
      optionA: "Table",
      optionB: "Column",
      optionC: "Row",
      optionD: "Index only",
      correctAnswer: "A"
    },
    {
      questionText: "What is a MongoDB document similar to?",
      optionA: "Row",
      optionB: "Database server",
      optionC: "Table",
      optionD: "SQL query",
      correctAnswer: "A"
    },
    {
      questionText: "Which identifier is commonly used for MongoDB documents?",
      optionA: "_id",
      optionB: "idOnly",
      optionC: "keyOnly",
      optionD: "primary",
      correctAnswer: "A"
    }
  ],

  "PostgreSQL": [
    {
      questionText: "What type of database is PostgreSQL?",
      optionA: "Relational database",
      optionB: "Document-only database",
      optionC: "File system",
      optionD: "Graph database only",
      correctAnswer: "A"
    },
    {
      questionText: "What language is commonly used to query PostgreSQL?",
      optionA: "SQL",
      optionB: "HTML",
      optionC: "CSS",
      optionD: "JavaScript only",
      correctAnswer: "A"
    },
    {
      questionText: "What is a table used for?",
      optionA: "Storing structured data",
      optionB: "Styling pages",
      optionC: "Running JavaScript",
      optionD: "Managing HTTP",
      correctAnswer: "A"
    },
    {
      questionText: "Which SQL command retrieves data?",
      optionA: "SELECT",
      optionB: "CREATE",
      optionC: "DELETE",
      optionD: "DROP",
      correctAnswer: "A"
    },
    {
      questionText: "What uniquely identifies a row in a table?",
      optionA: "Primary key",
      optionB: "CSS class",
      optionC: "HTTP method",
      optionD: "URL",
      correctAnswer: "A"
    }
  ],

  "Authentication": [
    {
      questionText: "What is authentication?",
      optionA: "Verifying a user's identity",
      optionB: "Styling a page",
      optionC: "Sorting data",
      optionD: "Creating a database",
      correctAnswer: "A"
    },
    {
      questionText: "What is a password hash?",
      optionA: "A transformed representation of a password",
      optionB: "The original password",
      optionC: "A username",
      optionD: "A database table",
      correctAnswer: "A"
    },
    {
      questionText: "Which technology is commonly used for token-based authentication?",
      optionA: "JWT",
      optionB: "CSS",
      optionC: "HTML",
      optionD: "SQL",
      correctAnswer: "A"
    },
    {
      questionText: "Why should passwords not be stored as plain text?",
      optionA: "A database leak could expose users' passwords",
      optionB: "They cannot be displayed",
      optionC: "They cannot be used in APIs",
      optionD: "They increase CSS size",
      correctAnswer: "A"
    },
    {
      questionText: "What does authorization determine?",
      optionA: "What an authenticated user is allowed to access",
      optionB: "Whether HTML is valid",
      optionC: "Whether CSS is loaded",
      optionD: "Whether a database exists",
      correctAnswer: "A"
    }
  ],

  "Backend Project": [
    {
      questionText: "What is the main purpose of a backend?",
      optionA: "Handle server-side logic and data",
      optionB: "Only style pages",
      optionC: "Only display images",
      optionD: "Only create animations",
      correctAnswer: "A"
    },
    {
      questionText: "What does a backend API provide?",
      optionA: "A way for clients to communicate with server functionality",
      optionB: "CSS styles",
      optionC: "Images only",
      optionD: "HTML tags",
      correctAnswer: "A"
    },
    {
      questionText: "Where is sensitive server-side logic generally executed?",
      optionA: "Backend server",
      optionB: "Browser CSS",
      optionC: "HTML",
      optionD: "Image file",
      correctAnswer: "A"
    },
    {
      questionText: "Why is input validation important?",
      optionA: "To ensure incoming data meets expected requirements",
      optionB: "To change page colors",
      optionC: "To create animations",
      optionD: "To resize images",
      correctAnswer: "A"
    },
    {
      questionText: "What should a backend generally do with database operations?",
      optionA: "Handle them securely on the server",
      optionB: "Expose database credentials to the browser",
      optionC: "Store passwords in frontend code",
      optionD: "Ignore validation",
      correctAnswer: "A"
    }
  ]
};

async function main() {
  for (const [topicTitle, questions] of Object.entries(quizQuestions)) {
    const topic = await prisma.topic.findFirst({
      where: {
        title: topicTitle
      }
    });

    if (!topic) {
      console.log(`Topic not found: ${topicTitle}`);
      continue;
    }

    const existingQuiz = await prisma.quiz.findUnique({
      where: {
        topicId: topic.id
      }
    });

    if (existingQuiz) {
      console.log(`Quiz already exists: ${topicTitle}`);
      continue;
    }

    await prisma.quiz.create({
      data: {
        title: `${topicTitle} Quiz`,
        topicId: topic.id,
        questions: {
          create: questions
        }
      }
    });

    console.log(`Created quiz: ${topicTitle}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });