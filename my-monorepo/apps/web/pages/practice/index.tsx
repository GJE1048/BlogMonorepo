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
  const progress = usePracticeStore((state: any) => state.progress);

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

        <div className="relative mb-8 max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search problems by title or tags..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
