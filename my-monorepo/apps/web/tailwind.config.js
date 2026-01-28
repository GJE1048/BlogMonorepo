/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '"PingFang SC"',
          '"Noto Sans SC"',
          'var(--font-noto-sans-sc)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'sans-serif'
        ],
        mono: [
          'var(--font-jetbrains-mono)',
          '"Fira Code"',
          'monospace'
        ]
      },
      colors: {
        // 语义化颜色（与 CSS 变量保持一致）
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        card: 'var(--color-card)',
        muted: 'var(--color-muted)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        border: 'var(--color-border)',
      },
      boxShadow: {
        'surface': 'var(--color-shadow)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 15px 50px rgba(99, 102, 241, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}