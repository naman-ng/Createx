import '../styles/globals.css';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import { WebBundlr } from '@bundlr-network/client';
import { useState, useRef } from 'react';
import { providers, utils } from 'ethers';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { polygonMumbai } from 'wagmi/chains';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import BundlrContextProvider from '../state/bundlr.context';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [jsonRpcProvider({ rpc: () => ({ http: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL }) }), publicProvider()]
);

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const { connectors } = getDefaultWallets({
  appName: 'Bundlr arweave testnet demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

export default function App({ Component, pageProps }) {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider theme={theme}>
            <BundlrContextProvider>
              <LivepeerConfig client={livepeerClient}>
                <Component {...pageProps} />
              </LivepeerConfig>
            </BundlrContextProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
