import Link from 'next/link';

export default function Creator() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-5 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
        Creator page
      </h1>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        {' '}
        <Link href={'/Creator/uploadContent'}>Upload Content </Link>
      </button>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        {' '}
        <Link href={'/Creator/liveStream'}>Live Stream </Link>
      </button>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        {' '}
        <Link href={'/Creator/chat'}>Chat </Link>
      </button>
      {/* <button className="m-5 p-5 font-medium text-xl rounded-md text-white bg-blue-400">
        <Link href={'/Creator/videoCall'}>Video Call </Link>
      </button> */}
    </div>
  );
}
