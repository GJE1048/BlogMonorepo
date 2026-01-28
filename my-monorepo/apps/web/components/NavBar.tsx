import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from './ui/Button';
import { useTheme } from '../lib/theme';

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === 'dark' ? '浅色' : '深色';

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link className="brand" href="/">
          知夏手记
        </Link>
        <nav className="nav-links">
          <Link href="/">首页</Link>
          <Link href="/">专栏</Link>
          <Link href="/">关于</Link>
        </nav>
      </div>
      <div className="navbar-actions">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="sm">
              分类
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="dropdown-content" sideOffset={8}>
              {['设计', '产品', 'AI', '增长'].map((item) => (
                <DropdownMenu.Item className="dropdown-item" key={item}>
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
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="dialog-content">
              <Dialog.Title className="dialog-title">订阅知夏手记</Dialog.Title>
              <Dialog.Description className="dialog-description">
                每周精选灵感与案例，发到你的邮箱。
              </Dialog.Description>
              <form className="dialog-form">
                <input className="input" placeholder="you@example.com" />
                <Button type="submit">立即订阅</Button>
              </form>
              <Dialog.Close asChild>
                <button className="icon-button" aria-label="Close">
                  ×
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="theme-toggle" onClick={toggleTheme}>
              {nextLabel}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" sideOffset={6}>
              切换到{nextLabel}模式
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="icon-button">⋯</button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="tooltip-content" sideOffset={6}>
              更多设置
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>
    </header>
  );
}
