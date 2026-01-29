import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProgress } from '../types/problem';

interface PracticeState {
  progress: Record<string, UserProgress>;
  updateProgress: (problemId: string, data: Partial<UserProgress>) => void;
  getCode: (problemId: string) => string | undefined;
  saveCode: (problemId: string, code: string) => void;
}

export const usePracticeStore = create<PracticeState>()(
  persist(
    (set, get) => ({
      progress: {},
      updateProgress: (problemId, data) =>
        set((state) => {
          const current = state.progress[problemId] || {
            problemId,
            status: 'unsolved',
            attempts: 0,
          };
          return {
            progress: {
              ...state.progress,
              [problemId]: { ...current, ...data },
            },
          };
        }),
      getCode: (problemId) => get().progress[problemId]?.code,
      saveCode: (problemId, code) =>
        get().updateProgress(problemId, { code, lastAttempted: new Date().toISOString() }),
    }),
    {
      name: 'practice-storage',
    }
  )
);
