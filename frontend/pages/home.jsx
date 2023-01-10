import Link from 'next/link';
import * as React from 'react';

export default function Home() {
  return (
    <div className="flex flex-row justify-center items-center justify-items-center content-center mt-20">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        <Link href={'/creator'}>Creator </Link>
      </button>

      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        <Link href={'/consumer'}>Consumer</Link>
      </button>
    </div>
  );
}
