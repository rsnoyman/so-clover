import "@/styles/globals.css";
import { CookiesProvider } from "react-cookie";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />;
    </CookiesProvider>
  );
}
