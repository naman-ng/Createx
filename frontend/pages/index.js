import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import * as React from 'react';
import Home from './home';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function App() {
  return (
    <>
      <LivepeerConfig client={livepeerClient}>
        <Home/>
      </LivepeerConfig>
    </>
  );
}
