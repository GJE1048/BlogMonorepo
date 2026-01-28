import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono, Noto_Sans_SC } from 'next/font/google';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeProvider } from '../lib/theme';
import '../styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({ 
  weight: ['400', '500', '700'], 
  subsets: ['latin'], 
  variable: '--font-noto-sans-sc',
  preload: false,
  display: 'swap',
});
export const metadata = {
  title: '郭佳恩的博客',
  description: '前端工程师的技术笔记与思考',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} font-sans antialiased`}>
      <ThemeProvider>
        <Tooltip.Provider delayDuration={200}>
          <Component {...pageProps} />
        </Tooltip.Provider>
      </ThemeProvider>
    </div>
  );
}
