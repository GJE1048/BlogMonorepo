import type { AppProps } from 'next/app';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ThemeProvider } from '../lib/theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Tooltip.Provider delayDuration={200}>
        <Component {...pageProps} />
      </Tooltip.Provider>
    </ThemeProvider>
  );
}
