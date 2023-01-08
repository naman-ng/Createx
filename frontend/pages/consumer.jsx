import Link from 'next/link';

export default function Consumer() {
  return (
    <div className="flex flex-col justify-center items-center">
      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/creator'}>Recorded </Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/Consumer/playStream'}>Live Stream</Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/consumer'}>Live Chat</Link>
      </button>

      <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/huddle'}>Live Video Call</Link>
      </button>
    </div>
  );
}
