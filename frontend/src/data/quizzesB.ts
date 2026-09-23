import { type Quiz } from '../types';

export const quizzesB: Quiz[] = [
  {
    id: 'q4',
    courseId: 'c6',
    lessonId: 'gradient-descent-step-by-step',
    title: 'ML Foundations Check',
    description: 'Gradient descent, overfitting and evaluation basics.',
    timeLimit: 10,
    questions: [
      {
        id: 'q4-1',
        text: 'What does a learning rate that is too high cause?',
        options: [
          'Slower convergence',
          'Overshooting and divergence',
          'Underflow in weights',
          'Perfect convergence',
        ],
        correctAnswer: 1,
        explanation: 'Too-large steps can oscillate or skip past minima entirely, causing divergence.',
      },
      {
        id: 'q4-2',
        text: 'A model that memorizes training noise has high...',
        options: ['Bias', 'Variance', 'Error rate at loss 0', 'Regularization'],
        correctAnswer: 1,
        explanation: 'High variance means the model is overly sensitive to the particular training sample.',
      },
      {
        id: 'q4-3',
        text: 'Why do we hold out a validation set?',
        options: [
          'To train on more data',
          'To tune hyperparameters honestly',
          'To save memory',
          'To increase overfitting',
        ],
        correctAnswer: 1,
        explanation: 'Validation data guides hyperparameter choices without tuning directly on the test set.',
      },
      {
        id: 'q4-4',
        text: 'L2 regularization works by...',
        options: [
          'Penalizing large weights',
          'Deleting features',
          'Augmenting data',
          'Early stopping only',
        ],
        correctAnswer: 0,
        explanation: 'L2 adds a penalty proportional to the squared magnitude of the weights.',
      },
    ],
  },
  {
    id: 'q5',
    courseId: 'c3',
    lessonId: 'hash-maps-and-sliding-windows',
    title: 'DSA Pattern Quiz',
    description: 'Test your grasp of hash maps and window techniques.',
    timeLimit: 8,
    questions: [
      {
        id: 'q5-1',
        text: 'A hash map gives average O(1) for which operations?',
        options: ['Search only', 'Insert, delete and lookup', 'Iteration', 'Sorting'],
        correctAnswer: 1,
        explanation: 'Hash maps provide average constant time insert, delete and lookup.',
      },
      {
        id: 'q5-2',
        text: 'The sliding window pattern is most useful for...',
        options: [
          'Subarray problems on contiguous sequences',
          'Graph shortest paths',
          'Sorting lists',
          'Binary tree balancing',
        ],
        correctAnswer: 0,
        explanation: 'Sliding windows keep a moving span over contiguous arrays to compute subarray properties.',
      },
      {
        id: 'q5-3',
        text: 'Worst-case time complexity of a poorly-hashed hash map is...',
        options: ['O(1)', 'O(log n)', 'O(n) per operation', 'O(n!)'],
        correctAnswer: 2,
        explanation: 'With heavy collisions every bucket degrades to a linear scan.',
      },
    ],
  },
  {
    id: 'q6',
    courseId: 'c7',
    lessonId: 'discriminated-unions-for-state-machines',
    title: 'TypeScript Type Systems',
    description: 'Generics and discriminated unions under the microscope.',
    timeLimit: 8,
    questions: [
      {
        id: 'q6-1',
        text: 'A discriminated union uses a shared property (the discriminant) to...',
        options: [
          'Select the runtime implementation',
          'Narrow the type in each branch',
          'Remove unions entirely',
          'Add default values',
        ],
        correctAnswer: 1,
        explanation: 'Checking the discriminant lets TypeScript narrow the union to a specific member.',
      },
      {
        id: 'q6-2',
        text: 'When is a generic type parameter useful?',
        options: [
          'When behavior must depend on the shape of the input',
          'When you know the exact type upfront',
          'Only for class declarations',
          'Never in functions',
        ],
        correctAnswer: 0,
        explanation: 'Generics preserve relationships between input and output types for arbitrary shapes.',
      },
      {
        id: 'q6-3',
        text: "The 'satisfies' operator is used to...",
        options: [
          'Replace all type assertions',
          'Check a value conforms without widening its inferred type',
          'Throw runtime errors',
          'Create enums',
        ],
        correctAnswer: 1,
        explanation: "satisfies validates compatibility while keeping the value's most specific inferred type.",
      },
    ],
  },
];