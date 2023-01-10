import { Player } from '@livepeer/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function playStream() {
  const [playbackId, setPlaybackId] = useState();
  const [isPlay, setIsPlay] = useState(false);

  let data = new Date();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-5 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
        LIVE STREAM page
      </h1>{' '}
      <input
        type="text"
        placeholder="Stream id"
        className="mt-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setPlaybackId(e.target.value)}
      />
      <button
        onClick={() => {
          setIsPlay(true);
        }}
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        Play Stream
      </button>
      {isPlay && (
        <Player
          title="Creator's stream"
          playbackId={playbackId}
          showPipButton
          showTitle={true}
          aspectRatio="16to9"
          // poster={<PosterImage />}
          controls={{
            autohide: 3000,
          }}
          theme={{
            radii: { containerBorderRadius: '10px' },
          }}
        />
      )}{' '}
    </div>
  );
}
