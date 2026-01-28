import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from './ui/Button';
import { useTheme } from '../lib/theme';
import { cn } from '../lib/cn';

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === 'dark' ? '浅色' : '深色';

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 gap-4 md:gap-0">
      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
        <Link className="text-xl font-bold tracking-tight text-[var(--color-text)]" href="/">
          知夏手记
        </Link>
        <nav className="flex gap-6 text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">首页</Link>
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">专栏</Link>
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">关于</Link>
        </nav>
      </div>
      
      <div className="flex gap-3 items-center w-full md:w-auto justify-end">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="sm">
              分类
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="min-w-[140px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg z-50 animate-in fade-in-80 zoom-in-95" 
              sideOffset={8}
            >
              {['设计', '产品', 'AI', '增长'].map((item) => (
                <DropdownMenu.Item 
                  className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-surface-2)] focus:text-[var(--color-text)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50" 
                  key={item}
                >
                  {item}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="outline" size="sm">
              订阅更新
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-2xl">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-[var(--color-text)]">订阅知夏手记</Dialog.Title>
                <Dialog.Description className="text-sm text-[var(--color-muted)]">
                  每周精选灵感与案例，发到你的邮箱。
                </Dialog.Description>
              </div>
              <form className="flex flex-col gap-3 py-4">
                <input 
                  className="flex h-10 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-2 text-sm ring-offset-[var(--color-surface)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[var(--color-text)]" 
                  placeholder="you@example.com" 
                />
                <Button type="submit" className="w-full">立即订阅</Button>
              </form>
              <Dialog.Close asChild>
                <button 
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--color-surface)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--color-accent)] data-[state=open]:text-white" 
                  aria-label="Close"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button 
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent-soft)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]" 
              onClick={toggleTheme}
            >
              <span className="sr-only">切换主题</span>
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="z-50 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text)] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2" 
              sideOffset={6}
            >
              切换到{nextLabel}模式
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-lg text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]">
              ⋯
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="z-50 overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text)] shadow-md animate-in fade-in-0 zoom-in-95" 
              sideOffset={6}
            >
              更多设置
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </header>
  );
}
