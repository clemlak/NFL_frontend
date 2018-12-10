import React, { Component } from 'react';
import Web3 from 'web3';
import {
  CryptoUtils,
  LoomProvider,
  LocalAddress,
  Client,
} from 'loom-js';

import Cookies from 'universal-cookie';

import ContractBuild from '../../common/contracts/NFL.json';

class CheckAccount extends Component {
  constructor(props) {
    super(props);

    this.cookies = new Cookies();

    if (!this.cookies.get('privateKey')) {
      const privateKey = CryptoUtils.generatePrivateKey();

      this.cookies.set('privateKey', CryptoUtils.Uint8ArrayToB64(privateKey), { path: '/' });
    }

    this.privateKey = CryptoUtils.B64ToUint8Array(this.cookies.get('privateKey'));
    this.publicKey = CryptoUtils.publicKeyFromPrivateKey(this.privateKey);

    this.client = new Client(
      'default',
      'ws://127.0.0.1:46658/websocket',
      'ws://127.0.0.1:46658/queryws',
    );

    this.from = LocalAddress.fromPublicKey(this.publicKey).toString();
    this.web3 = new Web3(new LoomProvider(this.client, this.privateKey));

    const { abi } = ContractBuild;
    const contractAddress = ContractBuild.networks.default.address;

    this.contract = new this.web3.eth.Contract(abi, contractAddress, { from: this.from });

    this.state = {
      balance: 0,
      address: this.from,
    };
  }

  render = () => {
    const {
      address,
    } = this.state;

    return (
      <div>
        <h1>
          {`Welcome ${address}!`}
        </h1>
      </div>
    );
  }
}

export default CheckAccount;
