export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestCase {
  input: any;
  output: any;
  description?: string;
}

export interface Problem {
  id: string;                    // Problem ID, e.g., "001-two-sum"
  title: string;                 // Problem title
  slug: string;                  // URL friendly name
  difficulty: Difficulty;        // Difficulty
  tags: string[];                // Tags: ['Array', 'Two Pointers', 'Frontend']
  category: string;              // Category: 'JavaScript', 'React', 'Algorithm'
  description: string;           // Problem description (Markdown)
  templateCode: string;          // Code template
  solutionCode?: string;         // Reference solution
  testCases: TestCase[];         // Test cases
  hints: string[];               // Hints
  relatedProblems?: string[];    // Related problems
  createdAt: string;             // Creation time
  solvedCount?: number;          // Solved count
  accepted?: boolean;            // User accepted status
}

export interface UserProgress {
  problemId: string;
  status: 'unsolved' | 'attempted' | 'solved';
  attempts: number;
  lastAttempted?: string;
  code?: string;                 // User's last submitted code
}
