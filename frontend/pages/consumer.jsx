import Link from 'next/link';

export default function Consumer() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-5 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
        Consumer
      </h1>
      
      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/Consumer/browse'}>Watch uploaded content </Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/Consumer/playStream'}>Play Live Stream</Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/consumer'}>Live Chat</Link>
      </button>
    </div>
  );
}
