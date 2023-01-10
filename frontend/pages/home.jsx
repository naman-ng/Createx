import Link from 'next/link';
import * as React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-5 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
        Createx 🚀🚀
      </h1>
      <div className="flex flex-row justify-center items-center justify-items-center content-center mt-20">
        <button
          type="button"
          className="text-white bg-gradient-to-r text-xl from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center p-10 m-10"
        >
          <Link href={'/creator'}>Creator </Link>
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r text-xl from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center p-10 m-10"
        >
          <Link href={'/consumer'}>Consumer</Link>
        </button>
      </div>
    </div>
  );
}
