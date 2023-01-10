import { useState } from 'react';
import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

const PK = '8665ed6c0de68518c0676ba29b5868a5020007151d6c91d7614a5b8e2a576ba8'; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

