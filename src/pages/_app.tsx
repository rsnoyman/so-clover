import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />;
    </CookiesProvider>
  );
}
