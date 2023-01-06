import Link from 'next/link';
import * as React from 'react';

export default function Home() {
  return (
    <div>
      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/creator'}>Creator </Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/consumer'}>Consumer</Link>
      </button>
    </div>
  );
}
