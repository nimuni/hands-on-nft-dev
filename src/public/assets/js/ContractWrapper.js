const _emptyFunc = () => {}

class ContractWrapper {
  makePromiEvent(){
    return 0;
  }
}

class NftContractWrapper {
  #nft_address;
  #nft_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "mintToken",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_creatorAddress",
          "type": "address"
        }
      ],
      "name": "getCreatorNFTIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  // #nft_abi = [
  //   {
  //     "inputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "approved",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Approval",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": false,
  //         "internalType": "bool",
  //         "name": "approved",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "ApprovalForAll",
  //     "type": "event"
  //   },
  //   {
  //     "anonymous": false,
  //     "inputs": [
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "indexed": true,
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "Transfer",
  //     "type": "event"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "approve",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "balanceOf",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "getApproved",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       }
  //     ],
  //     "name": "isApprovedForAll",
  //     "outputs": [
  //       {
  //         "internalType": "bool",
  //         "name": "",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "string",
  //         "name": "_tokenURI",
  //         "type": "string"
  //       }
  //     ],
  //     "name": "mintToken",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "name",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "ownerOf",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "safeTransferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bytes",
  //         "name": "data",
  //         "type": "bytes"
  //       }
  //     ],
  //     "name": "safeTransferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "operator",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "bool",
  //         "name": "approved",
  //         "type": "bool"
  //       }
  //     ],
  //     "name": "setApprovalForAll",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "bytes4",
  //         "name": "interfaceId",
  //         "type": "bytes4"
  //       }
  //     ],
  //     "name": "supportsInterface",
  //     "outputs": [
  //       {
  //         "internalType": "bool",
  //         "name": "",
  //         "type": "bool"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "symbol",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "tokenURI",
  //     "outputs": [
  //       {
  //         "internalType": "string",
  //         "name": "",
  //         "type": "string"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function"
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "address",
  //         "name": "from",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "to",
  //         "type": "address"
  //       },
  //       {
  //         "internalType": "uint256",
  //         "name": "tokenId",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "transferFrom",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }
  // ];
  #nftContractInstance;
  #defaultFromAccount;

  constructor(_fromAddress, _nftAddress){
    this.initNFTInstance(_nftAddress);

    this.#defaultFromAccount = _fromAddress;
  }

  initNFTInstance(_nftAddress="0xF44e7Bcc4870fa0eCE41C23815887D689e7Fd6c5"){
    this.#nftContractInstance = new web3.eth.Contract(this.#nft_abi, _nftAddress);
  }

  /////////////////////////////////////////////
  // Class Util function
  /////////////////////////////////////////////
  async getNftContractAddress(){
    return this.#nft_address;
  }
  getPastEvents({eventName, fromBlock, toBlock, tokenId, callback}){
    return new Promise((resolve, reject) => {
      let option = {
        fromBlock: fromBlock || 0,
        toBlock: toBlock || 'latest',
      }
      if(tokenId) option.filter = { tokenId : tokenId};

      const defaultCallback = (error, events) => {
        if (error) {
          reject(error)
        } else {
          resolve(events);
        }
      }

      this.#nftContractInstance.getPastEvents(
        eventName || 'Transfer',
        option,
        callback || defaultCallback
      )
    })
  }

  /////////////////////////////////////////////
  // Transact function
  /////////////////////////////////////////////
  async approve(_to, _tokenId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.approve(_to, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async mintToken(_to, _tokenURI, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let result = this.#nftContractInstance.methods.mintToken(_to, _tokenURI).send(txOptions);
    return result
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc)
  }
  async safeTransferFrom(_from, _to, _tokenId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.safeTransferFrom(_from, _to, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async safeTransferFrom(_from, _to, _tokenId, _data, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.safeTransferFrom(_from, _to, _tokenId, _data).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setApprovalForAll(_operator, _approved=false, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.setApprovalForAll(_operator, _approved).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async transferFrom(_from, _to, _tokenId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.transferFrom(_from, _to, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async balanceOf(_owner){
    return this.#nftContractInstance.methods.balanceOf(_owner).call();
  }
  async getApproved(_tokenId){
    return this.#nftContractInstance.methods.getApproved(_tokenId).call();
  }
  async isApprovedForAll(_owner, _operator){
    return this.#nftContractInstance.methods.isApprovedForAll(_owner, _operator).call();
  }
  async name(){
    return this.#nftContractInstance.methods.name().call();
  }
  async ownerOf(_tokenId){
    return this.#nftContractInstance.methods.ownerOf(_tokenId).call();
  }
  async supportsInterface(_interfaceId){
    return this.#nftContractInstance.methods.supportsInterface(_interfaceId).call();
  }
  async symbol(){
    return this.#nftContractInstance.methods.symbol().call();
  }
  async tokenURI(_tokenId){
    return this.#nftContractInstance.methods.tokenURI(_tokenId).call();
  }
  async totalSupply(_tokenId){
    return this.#nftContractInstance.methods.totalSupply().call();
  }
  async getCreatorNFTIds(_creatorAddress){
    return this.#nftContractInstance.methods.getCreatorNFTIds(_creatorAddress).call();
  }
  /////////////////////////////////////////////
  // Wrapper function
  /////////////////////////////////////////////
  getAddress(){
    return this.#nft_address;
  }
}

class MarketContractWrapper {
  // #market_address = "0x1ec54e1aE7b3001A496401B946088b91A0A47411";
  #market_address = "0x6B88E7102a55B81AD0BDc11A05d114F0738bCE58";
  #market_abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_offerIndex",
          "type": "uint256"
        }
      ],
      "name": "acceptOffer",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nftId",
          "type": "uint256"
        }
      ],
      "name": "buyMarketItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nftId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "listingMarketItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nftId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalListedMarketItemCount",
          "type": "uint256"
        }
      ],
      "name": "MarketItemListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nftId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        }
      ],
      "name": "MarketItemOffer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nftId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "MarketItemSold",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nftId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "offerer",
          "type": "address"
        }
      ],
      "name": "OfferAccept",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_nftId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endTime",
          "type": "uint256"
        }
      ],
      "name": "offerMarketItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_offerIndex",
          "type": "uint256"
        }
      ],
      "name": "withdrawOutdatedOffer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getListingPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        }
      ],
      "name": "getMarketItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        }
      ],
      "name": "getMarketItemsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMarketsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        }
      ],
      "name": "getMarketSellingItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        }
      ],
      "name": "getMarketSellingItemsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        }
      ],
      "name": "getMarketSoldItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getMyOutdatedOffers",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "remainPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.OfferDetail[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nftContractAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getOfferList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "offerer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "remainPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endTime",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.OfferDetail[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalMarketItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalMarketItemsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalMarketSellingItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalMarketSoldItems",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address payable",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "address payable",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "sold",
              "type": "bool"
            }
          ],
          "internalType": "struct NFTMarketplace.MarketItem[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  #marketContractInstance;
  #defaultListingPrice;
  #defaultFromAccount

  constructor(_fromAddress){
    this.#marketContractInstance = new web3.eth.Contract(this.#market_abi, this.#market_address);

    this.#setDefaultListingPriceFromBC();
    this.#defaultFromAccount = _fromAddress;
  }

  async #setDefaultListingPriceFromBC(){
    let _listingPrice = await this.#marketContractInstance.methods.getListingPrice().call();
    this.#defaultListingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async buyMarketItem(_nftContractAddress, _nftId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(option.value) // wei
    }
    return this.#marketContractInstance.methods.buyMarketItem(_nftContractAddress, _nftId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async listingMarketItem(_nftContractAddress, _nftId, _price, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    console.log("call listingMarketItem in wrapper")
    console.log(_nftContractAddress)
    console.log(_nftId)
    console.log(_price)
    console.log(option)
    return this.#marketContractInstance.methods.listingMarketItem(_nftContractAddress, _nftId, _price).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  async offerMarketItem(_nftContractAddress, _nftId, _endTime, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(option.value) // wei
    }
    return this.#marketContractInstance.methods.offerMarketItem(_nftContractAddress, _nftId, _endTime).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async acceptOffer(_nftContractAddress, _tokenId, _offerIndex, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: Number(this.#defaultListingPrice) // wei
    }
    return this.#marketContractInstance.methods.acceptOffer(_nftContractAddress, _tokenId, _offerIndex).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  /////////////////////////////////////////////
  // external function
  /////////////////////////////////////////////
  async withdrawOutdatedOffer(_nftContractAddress, _tokenId, _offerIndex, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    return this.#marketContractInstance.methods.withdrawOutdatedOffer(_nftContractAddress, _tokenId, _offerIndex).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getListingPrice(){
    return this.#marketContractInstance.methods.getListingPrice().call();
  }
  async getMarketItems(_nftContractAddress){
    return this.#marketContractInstance.methods.getMarketItems(_nftContractAddress).call();
  }
  async getMarketItemsCount(_nftContractAddress){
    return this.#marketContractInstance.methods.getMarketItemsCount(_nftContractAddress).call();
  }
  async getMarketsCount(){
    return this.#marketContractInstance.methods.getMarketsCount().call();
  }
  async getMarketSellingItems(_nftContractAddress){
    return this.#marketContractInstance.methods.getMarketSellingItems(_nftContractAddress).call();
  }
  async getMarketSellingItemsCount(_nftContractAddress){
    return this.#marketContractInstance.methods.getMarketSellingItemsCount(_nftContractAddress).call();
  }
  async getMarketSoldItems(_nftContractAddress){
    return this.#marketContractInstance.methods.getMarketSoldItems(_nftContractAddress).call();
  }
  async getTotalMarketItemsCount(){
    return this.#marketContractInstance.methods.getTotalMarketItemsCount().call();
  }
  async getTotalMarketItems(){
    return this.#marketContractInstance.methods.getTotalMarketItems().call();
  }
  async getTotalMarketSellingItems(){
    return this.#marketContractInstance.methods.getTotalMarketSellingItems().call();
  }
  async getTotalMarketSoldItems(){
    return this.#marketContractInstance.methods.getTotalMarketSoldItems().call();
  }
  async getOfferList(_nftContractAddress, _tokenId){
    return this.#marketContractInstance.methods.getOfferList(_nftContractAddress, _tokenId).call();
  }
  async getMyOutdatedOffers(_nftContractAddress, _tokenId){
    return this.#marketContractInstance.methods.getMyOutdatedOffers(_nftContractAddress, _tokenId).call();
  }
  /////////////////////////////////////////////
  // Wrapper function
  /////////////////////////////////////////////
  getAddress(){
    return this.#market_address;
  }
}

class AuctionContractWrapper {
  #auction_address = "0x1DEBff4eeBFB516cf2405Fd3784a8c3BC00475B7";
  #auction_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "endAt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startBid",
          "type": "uint256"
        }
      ],
      "name": "AuctionAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "highestBid",
          "type": "uint256"
        }
      ],
      "name": "AuctionBided",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "highestBidder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "highestBid",
          "type": "uint256"
        }
      ],
      "name": "AuctionEnded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_durationMinutes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_startBid",
          "type": "uint256"
        }
      ],
      "name": "addAuctionItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "bidAuctionItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "endAuctionItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAfterEndAtItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBeforeEndAtItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEndedItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getListingPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNotEndedItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "getSellerAuctionItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalItemCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalItemList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "seller",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "startAt",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "endAt",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "ended",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "highestBid",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "highestBidder",
              "type": "address"
            }
          ],
          "internalType": "struct AuctionMarket.AuctionStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "withdrawFromAuction",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  #auctionContractInstance
  #defaultListingPrice
  #defaultFromAccount

  constructor(_fromAddress){
    this.#auctionContractInstance = new web3.eth.Contract(this.#auction_abi, this.#auction_address);

    this.#setDefaultListingPriceFromBC();
    this.#defaultFromAccount = _fromAddress;
  }

  async #setDefaultListingPriceFromBC(){
    let _listingPrice = await this.#auctionContractInstance.methods.getListingPrice().call();
    this.#defaultListingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async addAuctionItem(_nft, _tokenId, _durationMinutes, _startBid) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.addAuctionItem(_nft, _tokenId, _durationMinutes, _startBid).send(txOptions);
    return _resultHash;
  }
  async bidAuctionItem(_nft, _tokenId) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.bidAuctionItem(_nft, _tokenId).send(txOptions);
    return _resultHash;
  }
  async endAuctionItem(_nft, _tokenId) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.endAuctionItem(_nft, _tokenId).send(txOptions);
    return _resultHash;
  }
  /////////////////////////////////////////////
  // Wrapper function
  /////////////////////////////////////////////
  getAddress(){
    return this.#auction_address;
  }
}
