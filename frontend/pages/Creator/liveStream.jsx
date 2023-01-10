import { useCreateStream, useLivepeerProvider } from '@livepeer/react';
import { useState } from 'react';
import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

const PK = '8665ed6c0de68518c0676ba29b5868a5020007151d6c91d7614a5b8e2a576ba8'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export default function liveStream() {
  const sendNotification = async () => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `GOING LIVE`,
          body: `Title: ${stream.name} and playbackId: ${stream.playbackId}`,
        },
        payload: {
          title: `GOING LIVE!!!`,
          body: `Title: ${stream.name} and playbackId: ${stream.playbackId}`,
          cta: '',
          img: '',
        },
        recipients: 'eip155:5:0x762cA62ca2549ad806763B3Aa1eA317c429bDBDa', // recipient address
        channel: 'eip155:5:0xFFd01a76cA473B48431E27Ab36f61a764270238F', // your channel address
        env: 'staging',
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  const [streamName, setStreamName] = useState();
  const { mutate: createStream, data: stream, status: createStatus } = useCreateStream({ name: streamName });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold pb-2 mt-5 text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88] text-center lg:text-7xl">
        LIVE STREAM page
      </h1>{' '}
      <input
        type="text"
        placeholder="Stream name"
        className="mt-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setStreamName(e.target.value)}
      />
      <button
        onClick={() => {
          createStream?.();
        }}
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        Create Stream
      </button>
      {stream && (
        <>
          <p className=" text-fuchsia-600 text-lg mt-2">Stream key: {stream.streamKey}</p>
          <p className=" text-fuchsia-600 text-lg mt-2">Stream Name: {stream.name}</p>
          <p className=" text-fuchsia-600 text-lg mt-2">Playback ID: {stream.playbackId}</p>
        </>
      )}
      <button
        onClick={sendNotification}
        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-10 m-10"
      >
        Send Notification
      </button>
    </div>
  );
}
