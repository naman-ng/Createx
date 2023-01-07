import Link from 'next/link';
import * as React from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/creator'}>Creator </Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/consumer'}>Consumer</Link>
      </button>
      <div className="Uniswap justify-center items-center">
        <SwapWidget />
      </div>
    </div>
  );
}
