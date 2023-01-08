import { Player } from '@livepeer/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function playStream() {
  const [playbackId, setPlaybackId] = useState();
  const [isPlay, setIsPlay] = useState(false);
  
  let data = new Date();

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-2 text-center lg:text-7xl">LIVE STREAM page</h1>{' '}
      <input
        type="text"
        placeholder="Stream id"
        className="bg-slate-900 text-white"
        onChange={(e) => setPlaybackId(e.target.value)}
      />
      <button
        onClick={() => {
          setIsPlay(true)
        }}
        className="m-10 border border-cyan-600 p-2 rounded-md"
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
