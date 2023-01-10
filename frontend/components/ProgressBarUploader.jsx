import React, { useState, useRef } from 'react';
import { useProvider, useSigner } from 'wagmi';
import { WebBundlr } from '@bundlr-network/client';
import fileReaderStream from 'filereader-stream';
import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

const PK = '8665ed6c0de68518c0676ba29b5868a5020007151d6c91d7614a5b8e2a576ba8'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const ProgressBarUploader = () => {
  const [message, setMessage] = useState('');
  const [uploadedURL, setUploadedURL] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileToUpload, setFileToUpload] = useState();
  const [fileType, setFileType] = useState();
  const [fileSize, setFileSize] = useState(0);
  const totalChunks = useRef(0);

  const rainbowKitProvider = useProvider();
  const { data: rainbowKitSigner, isError, isLoading } = useSigner();

  const sendNotification = async () => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `NEW CONTENT`,
          body: `ARWEAVE URL: ${uploadedURL}`,
        },
        payload: {
          title: `NEW CONTENT!!!`,
          body: `ARWEAVE URL: ${uploadedURL}`,
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

  const handleFile = async (e) => {
    setMessage('');
    const newFiles = e.target.files;
    if (newFiles.length === 0) return;

    setFileToUpload(newFiles[0]);
    setFileType(newFiles[0]['type']);
  };

  const upload = async () => {
    if (!rainbowKitSigner) {
      setMessage('Please connect your wallet first.');
      return;
    }
    if (!fileToUpload) {
      setMessage('Please select a file first.');
      return;
    }
    // Reset the progress bar
    setProgress(0);
    // use method injection to add the missing function
    rainbowKitProvider.getSigner = () => rainbowKitSigner;
    // create a WebBundlr object
    const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', rainbowKitProvider, {
      providerUrl: 'https://matic-mumbai.chainstacklabs.com',
    });

    await bundlr.ready();

    const uploader = bundlr.uploader.chunkedUploader;
    // Change the batch size to 1 to make testing easier (default is 5)
    uploader.setBatchSize(1);
    // Change the chunk size to something small to make testing easier (default is 25MB)
    const chunkSize = 2000000;
    uploader.setChunkSize(chunkSize);
    // get a create a streamed reader
    const dataStream = fileReaderStream(fileToUpload);
    // save a reference to the file size
    setFileSize(dataStream.size);
    // divide the total file size by the size of each chunk we'll upload
    if (dataStream.size < chunkSize) totalChunks.current = 1;
    else {
      totalChunks.current = Math.floor(dataStream.size / chunkSize);
    }

    /** Register Event Callbacks */
    // event callback: called for every chunk uploaded
    uploader.on('chunkUpload', (chunkInfo) => {
      console.log(chunkInfo);
      console.log(
        `Uploaded Chunk number ${chunkInfo.id}, offset of ${chunkInfo.offset}, size ${chunkInfo.size} Bytes, with a total of ${chunkInfo.totalUploaded} bytes uploaded.`
      );

      const chunkNumber = chunkInfo.id + 1;
      // update the progress bar based on how much has been uploaded
      if (chunkNumber >= totalChunks) setProgress(100);
      else setProgress((chunkNumber / totalChunks.current) * 100);
    });

    // event callback: called if an error happens
    uploader.on('chunkError', (e) => {
      console.error(`Error uploading chunk number ${e.id} - ${e.res.statusText}`);
    });

    // event callback: called when file is fully uploaded
    uploader.on('done', (finishRes) => {
      console.log(`Upload completed with ID ${finishRes.id}`);
      // set the progress bar to 100
      setProgress(100);
    });

    // upload the file
    await uploader
      .uploadData(dataStream, {
        tags: [{ name: 'Content-Type', value: fileType }],
      })
      .then((res) => {
        setMessage(`Upload Success:`);
        setUploadedURL('https://arweave.net/' + res.data.id);
        sendNotification;
      })
      .catch((e) => {
        setMessage('Upload error ', e.message);
        console.log('error on upload, ', e);
      });
  };

  return (
    <div className="flex flex-col py-5 ml-10">
      <label className="pr-5 block mb-2 font-bold text-text underline decoration-secondary">Upload file</label>
      <div className="flex flex-row">
        <input
          type="file"
          onChange={handleFile}
          className="w-1/3 px-1 py-1 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          multiple="single"
          name="files[]"
        />
        <button
          className="ml-5 bg-primary hover:bg-blue-700 text-background font-bold py-1 px-3 rounded-lg"
          onClick={upload}
        >
          Upload
        </button>
      </div>
      <div className="mt-2 w-2/3 h-6 bg-gray-200 rounded-full dark:bg-gray-700" id="progress_bar_container">
        <div
          className="h-6  bg-blue-600 rounded-full dark:bg-blue-500"
          style={{ width: progress + '%' }}
          id="progress_bar"
        ></div>
      </div>
      <p className="text-messageText text-sm">{message}</p>
      <p className="text-text text-sm">
        {uploadedURL && (
          <a className="underline" href={uploadedURL} target="_blank">
            {uploadedURL} {sendNotification}
          </a>
        )}
      </p>
    </div>
  );
};

export default ProgressBarUploader;
