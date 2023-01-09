import '../styles/globals.css';
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react';
import { WebBundlr } from '@bundlr-network/client';
import { MainContext } from '../context';
import { useState, useRef } from 'react';
import { providers, utils } from 'ethers';

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

export default function App({ Component, pageProps }) {
  const [bundlrInstance, setBundlrInstance] = useState();
  const [balance, setBalance] = useState();
  const bundlrRef = useRef();

  async function initialiseBundlr() {
    await window.ethereum.enable();

    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready();

    const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', provider, {
      providerUrl: 'https://thrumming-quiet-yard.matic-testnet.discover.quiknode.pro/e8d17c21d6f86cdc291e6c8fa44a6868c51ee863/',
    });
    await bundlr.ready();

    setBundlrInstance(bundlr);
    bundlrRef.current = bundlr;
    fetchBalance();
  }

  async function fetchBalance() {
    const bal = await bundlrRef.current.getLoadedBalance();
    console.log('bal: ', utils.formatEther(bal.toString()));
    setBalance(utils.formatEther(bal.toString()));
  }

  return (
    <div>
      <MainContext.Provider
        value={{
          initialiseBundlr,
          bundlrInstance,
          balance,
          fetchBalance,
        }}
      >
        <LivepeerConfig client={livepeerClient}>
          <Component {...pageProps} />
        </LivepeerConfig>
      </MainContext.Provider>
    </div>
  );
}
