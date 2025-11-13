import type { AppProps } from 'next/app';

/**
 * The custom App component wraps every page in the application. This
 * file is required when using TypeScript with Next.js and can be
 * extended to include global providers or styles. Currently it
 * renders pages without modification.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
