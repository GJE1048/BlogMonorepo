import { Problem } from '../../types/problem';

export const tsUtilityTypesProblem: Problem = {
  id: '115',
  title: 'Implement Pick<T, K>',
  slug: 'ts-utility-pick',
  difficulty: 'medium',
  category: 'TypeScript',
  tags: ['TypeScript', 'Utility Types'],
  description: `
Implement the \`MyPick<T, K>\` utility type, which behaves exactly like TypeScript's built-in \`Pick<T, K>\`.

Constructs a type by picking the set of properties \`K\` from \`T\`.

Example:
\`\`\`ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
\`\`\`
  `,
  templateCode: `
// Implement MyPick<T, K>
type MyPick<T, K extends keyof T> = any; // Change this line

// Do not delete this function, it's for test verification
function checkType(obj) {
  return obj;
}
`,
  solutionCode: `
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

function checkType(obj) {
  return obj;
}
`,
  testCases: [
    {
      input: [{ title: 'Test', completed: true }],
      output: { title: 'Test', completed: true },
    }
  ],
  hints: [
    'Use Mapped Types.',
    'Iterate over K using `[P in K]`.',
  ],
  createdAt: '2024-01-29',
};
