import '../styles/globals.css';

import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function App({ Component, pageProps }) {
  return (
    <LivepeerConfig client={livepeerClient}>
      <Component {...pageProps} />
    </LivepeerConfig>
  );
}
