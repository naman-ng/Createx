import BigNumber from 'bignumber.js';
import { useContext, useState } from 'react';
import { MainContext } from '../../context';
import { WebBundlr } from '@bundlr-network/client';

export default function uploadContent() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [URI, setURI] = useState();
  const [amount, setAmount] = useState();
  const { bundlrInstance, initialiseBundlr, balance, fetchBalance } = useContext(MainContext);

  async function initialize() {
    initialiseBundlr();
  }

  function onFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setImage(image);
      let reader = new FileReader();
      reader.onload = function () {
        if (reader.result) {
          setFile(Buffer.from(reader.result));
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  async function uploadFile() {
    const tx = await bundlrInstance.uploader.upload(file, [{ name: 'Content-Type', value: 'image/png' }]);
    console.log('tx: ', tx.data);
    setURI(`http://arweave.net/${tx.data.id}`);
    // "ar://0dO1AWy6u8JabFjEHQQBwrT3dEaD_LHm_wYoGP4VSYI"
    // http://arweave.net/2arYGOhXEuNdurgTE72gqruCNL7twudM7K6EWVjCsfA
  }

  async function fundWallet() {
    if (!amount) return;
    const amountParsed = parseInput(amount);
    let response = await bundlrInstance.fund(amountParsed);
    console.log('Wallet funded: ', response);
    fetchBalance();
  }

  function parseInput(input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1]);
    if (conv.isLessThan(1)) {
      console.log('error: value too small');
      return;
    } else {
      return conv;
    }
  }

  return (
    <div style={containerStyle}>
      {!balance && <button onClick={initialize}>Initialize</button>}
      {balance && (
        <div>
          <h3>Balance: {balance}</h3>
          <div style={{ padding: '20px 0px' }}>
            <input onChange={(e) => setAmount(e.target.value)} />
            <button onClick={fundWallet}>Fund Wallet</button>
          </div>
          <input type="file" onChange={onFileChange} />
          <button onClick={uploadFile}>Upload File</button>
          {image && <img src={image} style={{ width: '200px' }} />}
          {URI && <a href={URI}>{URI}</a>}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  padding: '100px 20px',
};
