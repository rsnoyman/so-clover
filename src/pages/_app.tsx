import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

import BoardProvider from '@/components/BoardProvider';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <BoardProvider>
        <Component {...pageProps} />
      </BoardProvider>
    </CookiesProvider>
  );
}
