import { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, Button, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { useBundler } from '../../state/bundlr.context';
import { useAccount, useNetwork } from 'wagmi';
import FundWallet from '../../components/FundWallet';
import ProgressBarUploader from '../../components/ProgressBarUploader';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { initialiseBundlr, bundlrInstance, balance } = useBundler();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  if (!address) {
    return (
      <div className="justify-center items-center h-screen flex ">
        <VStack gap={8}>
          <Text className="text-4xl font-bold">Connect your wallet first</Text>
          <ConnectButton />
        </VStack>
      </div>
    );
  }

  if (chain && chain.id !== 80001) {
    return (
      <div className="justify-center items-center h-screen flex ">
        <VStack gap={8}>
          <Text className="text-4xl font-bold">Opps, wrong network!! Switch to Polygon Mumbai Testnet</Text>
          <ConnectButton />
        </VStack>
      </div>
    );
  }

  if (!bundlrInstance) {
    return (
      <div className="justify-center items-center h-screen flex ">
        <VStack gap={8}>
          <ConnectButton />
          <Text className="text-4xl font-bold">Let's initialise Bundlr now</Text>
          <Button className="mt-10" onClick={initialiseBundlr}>
            Initialise Bundlr
          </Button>
        </VStack>
      </div>
    );
  }

  if (!balance || Number(balance) <= 0) {
    return (
      <div className="justify-center items-center h-screen flex ">
        <VStack gap={8}>
          <ConnectButton />
          <Text className="text-4xl font-bold">Opps, out of funds!, let's add some</Text>
          <FundWallet />
        </VStack>
      </div>
    );
  }

  return (
    <div className="justify-center items-center h-screen flex">
      <Stack direction={['column', 'row']} justifyContent={'space-around'} width={'full'} alignItems={'center'}>
        <VStack gap={8}>
          <ConnectButton />
          <FundWallet />
        </VStack>
        <VStack gap={8}>
          <Text fontSize={'4xl'}>Select Video To Upload</Text>
          <ProgressBarUploader/>
        </VStack>
      </Stack>
    </div>
  );
};
export default Home;
