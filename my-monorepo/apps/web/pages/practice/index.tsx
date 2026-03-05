import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { problems } from '../../data/problems';
import { ProblemCard } from '../../components/practice/ProblemCard';
import { usePracticeStore } from '../../store/practiceStore';
import { Search } from 'lucide-react';
import { fetchAuthor } from '../../lib/api';
import type { Author } from '../../lib/types';

export default function PracticePage({ author }: { author: Author }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const progress = usePracticeStore((state: any) => state.progress);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(problems.map(p => p.category)))];

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <Layout author={author} showSidebar={false}>
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Frontend Practice
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Master frontend interview questions with our interactive coding platform.
            Practice JavaScript, React, and algorithms.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search problems by title or tags..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[120px]"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredProblems.map(problem => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
              progress={progress[problem.id]}
            />
          ))}
          
          {filteredProblems.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No problems found matching your search.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const author = await fetchAuthor('1');
    return { props: { author } };
  } catch (_err) {
    const author: Author = {
      name: '知夏',
      title: '内容与产品',
      avatarUrl: '',
      bio: '结构化表达与长期复用。',
      stats: { posts: 0, followers: 0, readingHours: 0, weeklyCompletion: 0 },
      links: [],
    };
    return { props: { author } };
  }
}
