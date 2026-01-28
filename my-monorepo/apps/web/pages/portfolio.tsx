
import React from 'react';
import Head from 'next/head';
import { NavBar } from '../components/NavBar';
import { Github, Twitter, Mail, ExternalLink, Code2, Layers, Cpu, Database, Palette } from 'lucide-react';
import { cn } from '../lib/cn';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-accent)]">
      <Head>
        <title>郭佳恩 | Personal Space</title>
        <meta name="description" content="郭佳恩的个人空间 - 前端工程师，关注体验与效率。" />
      </Head>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <NavBar />
        
        <main className="flex flex-col gap-24 py-12 md:py-24 animate-in fade-in duration-700 slide-in-from-bottom-4">
          
          {/* Hero Section */}
          <section className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse"></div>
              <img 
                src="https://github.com/shadcn.png" 
                alt="郭佳恩" 
                className="relative w-32 h-32 rounded-full border-4 border-[var(--color-surface)] shadow-2xl"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-[var(--color-muted)]">
              Building Digital <br /> Experiences.
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--color-muted)] leading-relaxed max-w-2xl">
              我是郭佳恩，一名前端工程师。
              <br />
              关注体验与效率的交汇点，致力于打造优雅的用户界面与高性能的 Web 应用。
            </p>

            <div className="flex gap-4 mt-4">
              <SocialButton href="https://github.com" icon={<Github size={20} />} label="GitHub" />
              <SocialButton href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
              <SocialButton href="mailto:hello@example.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Tech Stack</h2>
              <div className="h-px bg-[var(--color-border)] flex-1"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TechCard icon={<Code2 />} title="Frontend" items={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']} color="text-blue-500" bg="bg-blue-500/10" />
              <TechCard icon={<Cpu />} title="Backend" items={['Node.js', 'Rust', 'PostgreSQL', 'GraphQL']} color="text-orange-500" bg="bg-orange-500/10" />
              <TechCard icon={<Palette />} title="Design" items={['Figma', 'UI/UX', 'Design Systems', 'Motion']} color="text-purple-500" bg="bg-purple-500/10" />
              <TechCard icon={<Layers />} title="DevOps" items={['Docker', 'CI/CD', 'Vercel', 'AWS']} color="text-green-500" bg="bg-green-500/10" />
            </div>
          </section>

          {/* Projects Showcase Section */}
          <section className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <div className="h-px bg-[var(--color-border)] flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard 
                title="My Monorepo"
                description="A high-performance monorepo setup featuring Next.js 14, TurboRepo, and a shared UI library. Designed for scalability and developer experience."
                tags={['Next.js', 'TurboRepo', 'TypeScript']}
                gradient="from-pink-500 to-rose-500"
                link="#"
              />
              <ProjectCard 
                title="Neon CMS"
                description="A modern content management system built with Neon DB (Serverless Postgres) and Drizzle ORM. Features real-time collaboration and AI-assisted editing."
                tags={['PostgreSQL', 'Drizzle', 'AI']}
                gradient="from-cyan-500 to-blue-500"
                link="#"
              />
              <ProjectCard 
                title="Rust Async Runtime"
                description="An educational implementation of a Rust async runtime. Demonstrates the core concepts of Futures, Tasks, and Executors."
                tags={['Rust', 'Systems', 'Concurrency']}
                gradient="from-orange-500 to-amber-500"
                link="#"
              />
              <ProjectCard 
                title="Design System 2.0"
                description="A comprehensive React component library implementing accessible, composable, and themeable UI primitives based on Radix UI."
                tags={['React', 'Radix UI', 'Storybook']}
                gradient="from-violet-500 to-purple-500"
                link="#"
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 border-t border-[var(--color-border)] text-center text-[var(--color-muted)]">
            <p>© {new Date().getFullYear()} 郭佳恩. All rights reserved.</p>
            <p className="text-sm mt-2">Designed with passion and code.</p>
          </footer>

        </main>
      </div>
    </div>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-medium transition-all hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] hover:scale-105 active:scale-95"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function TechCard({ icon, title, items, color, bg }: { icon: React.ReactNode; title: string; items: string[]; color: string; bg: string }) {
  return (
    <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", bg, color)}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 text-[var(--color-text)]">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item} className="text-sm text-[var(--color-muted)] bg-[var(--color-surface-2)] px-2 py-1 rounded-md">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tags, gradient, link }: { title: string; description: string; tags: string[]; gradient: string; link: string }) {
  return (
    <a href={link} className="group relative block h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur-md" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500`}></div>
      
      <div className="relative h-full flex flex-col overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-transform duration-300 group-hover:-translate-y-1">
        {/* Mockup / Image Placeholder */}
        <div className={`h-48 w-full bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
           {/* Decorative elements */}
           <div className="w-3/4 h-3/4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl transform rotate-3 transition-transform group-hover:rotate-0 flex items-center justify-center text-white font-bold text-2xl tracking-widest">
              {title}
           </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-2 text-[var(--color-text)] flex items-center justify-between">
            {title}
            <ExternalLink size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--color-muted)]" />
          </h3>
          <p className="text-[var(--color-muted)] mb-6 leading-relaxed flex-grow">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--color-surface-2)] text-[var(--color-text)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
