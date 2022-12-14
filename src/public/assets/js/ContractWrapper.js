const _emptyFunc = () => {}

class ContractWrapper {
  makePromiEvent(){
    return 0;
  }
}
/*

class NftContractWrapper {
  #nft_contract_address = "0xe2dD7AC22920958837f58aB8f7eFBCa548b5528c";
  #nft_contract_abi = [
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
    }
  ];
  #nftContractInstance;

  constructor(){
    console.log("call nftContractWrapper constructor")
    this.#nftContractInstance = new web3.eth.Contract(this.#nft_contract_abi, this.#nft_contract_address);
  }

  async getNftContractAddress(){
    return this.#nft_contract_address;
  }

  /////////////////////////////////////////////
  // Transact function
  /////////////////////////////////////////////
  async approve(_to, _tokenId) {
    console.log("call approve")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.approve(_to, _tokenId).send(txOptions);
    return _resultHash;
  }
  async mintToken(_to, _tokenURI) {
    console.log("call mintToken")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.mintToken(_to, _tokenURI).send(txOptions);
    return _resultHash;
  }
  async safeTransferFrom(_from, _to, _tokenId) {
    console.log("call safeTransferFrom")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.safeTransferFrom(_from, _to, _tokenId).send(txOptions);
    return _resultHash;
  }
  async safeTransferFrom(_from, _to, _tokenId, _data) {
    console.log("call safeTransferFrom2")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.safeTransferFrom(_from, _to, _tokenId, _data).send(txOptions);
    return _resultHash;
  }
  async setApprovalForAll(_operator, _approved=false) {
    console.log("call setApprovalForAll")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.setApprovalForAll(_from, _approved).send(txOptions);
    return _resultHash;
  }
  async transferFrom(_from, _to, _tokenId) {
    console.log("call transferFrom")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.transferFrom(_from, _to, _tokenId).send(txOptions);
    return _resultHash;
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async balanceOf(_owner){
    console.log("call balanceOf")
    let _numberOfNFT = await this.#nftContractInstance.methods.balanceOf(_owner).call();
    return _numberOfNFT;
  }
  async getApproved(_tokenId){
    console.log("call getApproved")
    let _address = await this.#marketContractInstance.methods.getApproved(_tokenId).call();
    return _address;
  }
  async isApprovedForAll(_owner, _operator){
    console.log("call isApprovedForAll")
    let _result = await this.#marketContractInstance.methods.isApprovedForAll(_owner, _operator).call();
    return _result;
  }
  async name(){
    console.log("call name")
    let _name = await this.#nftContractInstance.methods.name().call();
    return _name;
  }
  async ownerOf(_tokenId){
    console.log("call ownerOf")
    let _address = await this.#nftContractInstance.methods.ownerOf(_tokenId).call();
    return _address;
  }
  async supportsInterface(_interfaceId){
    console.log("call supportsInterface")
    let _result = await this.#nftContractInstance.methods.supportsInterface(_interfaceId).call();
    return _result;
  }
  async symbol(){
    console.log("call symbol")
    let _symbol = await this.#nftContractInstance.methods.symbol().call();
    return _symbol;
  }
  async tokenURI(_tokenId){
    console.log("call tokenURI")
    let _tokenURI = await this.#nftContractInstance.methods.tokenURI(_tokenId).call();
    return _tokenURI;
  }
}

class MarketContractWrapper {
  #nft_marketplace_address = "0x1ec54e1aE7b3001A496401B946088b91A0A47411";
  #nft_marketplace_abi = [
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
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "MarketItemSold",
      "type": "event"
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

  constructor(){
    console.log("call ContractWrapper constructor")
    this.#marketContractInstance = new web3.eth.Contract(this.#nft_marketplace_abi, this.#nft_marketplace_address);

    this.#setDefaultListingPriceFromBC();
  }

  async #setDefaultListingPriceFromBC(){
    console.log("call #getDefaultListingPriceFromBC")
    let _listingPrice = await this.#marketContractInstance.methods.getListingPrice().call();
    console.log(`Listing Fee: ${_listingPrice} wei`)
    this.#defaultListingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async buyMarketItem(_nftContractAddress, _nftId) {
    console.log("call buyMarketItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.buyMarketItem(_nftContractAddress, _nftId).send(txOptions);
    return _resultHash;
  }
  async listingMarketItem(_nftContractAddress, _nftId, _price) {
    console.log("call listingMarketItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#marketContractInstance.methods.listingMarketItem(_nftContractAddress, _nftId, _price).send(txOptions);
    return _resultHash;
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getListingPrice(){
    console.log("call getListingPrice")
    let _price = await this.#marketContractInstance.methods.getListingPrice().call();
    return _price;
  }
  async getMarketItems(_nftContractAddress){
    console.log("call getMarketItems")
    let _price = await this.#marketContractInstance.methods.getMarketItems(_nftContractAddress).call();
    return _price;
  }
  async getMarketItemsCount(_nftContractAddress){
    console.log("call getMarketItemsCount")
    let _price = await this.#marketContractInstance.methods.getMarketItemsCount(_nftContractAddress).call();
    return _price;
  }
  async getMarketsCount(){
    console.log("call getMarketsCount")
    let _price = await this.#marketContractInstance.methods.getMarketsCount().call();
    return _price;
  }
  async getMarketSellingItems(_nftContractAddress){
    console.log("call getMarketSellingItems")
    let _price = await this.#marketContractInstance.methods.getMarketSellingItems(_nftContractAddress).call();
    return _price;
  }
  async getMarketSellingItemsCount(_nftContractAddress){
    console.log("call getMarketSellingItemsCount")
    let _price = await this.#marketContractInstance.methods.getMarketSellingItemsCount(_nftContractAddress).call();
    return _price;
  }
  async getMarketSoldItems(_nftContractAddress){
    console.log("call getMarketSoldItems")
    let _price = await this.#marketContractInstance.methods.getMarketSoldItems(_nftContractAddress).call();
    return _price;
  }
  async getTotalMarketItemsCount(){
    console.log("call getTotalMarketItemsCount")
    let _price = await this.#marketContractInstance.methods.getTotalMarketItemsCount().call();
    return _price;
  }
  async getTotalMarketItems(){
    console.log("call getTotalMarketItems")
    let _price = await this.#marketContractInstance.methods.getTotalMarketItems().call();
    return _price;
  }
  async getTotalMarketSellingItems(){
    console.log("call getTotalMarketSellingItems")
    let _price = await this.#marketContractInstance.methods.getTotalMarketSellingItems().call();
    return _price;
  }
  async getTotalMarketSoldItems(){
    console.log("call getTotalMarketSoldItems")
    let _price = await this.#marketContractInstance.methods.getTotalMarketSoldItems().call();
    return _price;
  }
}
*/

console.log("call ContractWrapper")
class NftContractWrapper {
  #nft_contract_address = "0xe2dD7AC22920958837f58aB8f7eFBCa548b5528c";
  #nft_contract_abi = [
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
    }
  ];
  #nftContractInstance;
  #defaultFromAccount;

  constructor(_fromAddress){
    console.log("call nftContractWrapper constructor")
    this.#nftContractInstance = new web3.eth.Contract(this.#nft_contract_abi, this.#nft_contract_address);
    this.#defaultFromAccount = _fromAddress;
  }

  async getNftContractAddress(){
    return this.#nft_contract_address;
  }

  /////////////////////////////////////////////
  // Transact function
  /////////////////////////////////////////////
  async approve(_to, _tokenId, option) {
    console.log("call approve")
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
    console.log("call mintToken")
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
    console.log("call safeTransferFrom")
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
    console.log("call safeTransferFrom2")
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
    console.log("call setApprovalForAll")
    let txOptions = {
      from: this.#defaultFromAccount,
      // value: this.#defaultListingPrice // wei
    }
    return this.#nftContractInstance.methods.setApprovalForAll(_from, _approved).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async transferFrom(_from, _to, _tokenId, option) {
    console.log("call transferFrom")
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
    console.log("call balanceOf")
    return this.#nftContractInstance.methods.balanceOf(_owner).call();
  }
  async getApproved(_tokenId){
    console.log("call getApproved")
    return this.#nftContractInstance.methods.getApproved(_tokenId).call();
  }
  async isApprovedForAll(_owner, _operator){
    console.log("call isApprovedForAll")
    return this.#nftContractInstance.methods.isApprovedForAll(_owner, _operator).call();
  }
  async name(){
    console.log("call name")
    return this.#nftContractInstance.methods.name().call();
  }
  async ownerOf(_tokenId){
    console.log("call ownerOf")
    return this.#nftContractInstance.methods.ownerOf(_tokenId).call();
  }
  async supportsInterface(_interfaceId){
    console.log("call supportsInterface")
    return this.#nftContractInstance.methods.supportsInterface(_interfaceId).call();
  }
  async symbol(){
    console.log("call symbol")
    return this.#nftContractInstance.methods.symbol().call();
  }
  async tokenURI(_tokenId){
    console.log("call tokenURI")
    return this.#nftContractInstance.methods.tokenURI(_tokenId).call();
  }
}

class MarketContractWrapper {
  #nft_marketplace_address = "0x1ec54e1aE7b3001A496401B946088b91A0A47411";
  #nft_marketplace_abi = [
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
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "MarketItemSold",
      "type": "event"
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
    console.log("call ContractWrapper constructor")
    this.#marketContractInstance = new web3.eth.Contract(this.#nft_marketplace_abi, this.#nft_marketplace_address);

    this.#setDefaultListingPriceFromBC();
    this.#defaultFromAccount = _fromAddress;
  }

  async #setDefaultListingPriceFromBC(){
    console.log("call #getDefaultListingPriceFromBC")
    let _listingPrice = await this.#marketContractInstance.methods.getListingPrice().call();
    console.log(`Listing Fee: ${_listingPrice} wei`)
    this.#defaultListingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async buyMarketItem(_nftContractAddress, _nftId, option) {
    console.log("call buyMarketItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    return this.#marketContractInstance.methods.buyMarketItem(_nftContractAddress, _nftId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async listingMarketItem(_nftContractAddress, _nftId, _price, option) {
    console.log("call listingMarketItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    return this.#marketContractInstance.methods.listingMarketItem(_nftContractAddress, _nftId, _price).send(txOptions)
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
    console.log("call getListingPrice")
    return this.#marketContractInstance.methods.getListingPrice().call();
  }
  async getMarketItems(_nftContractAddress){
    console.log("call getMarketItems")
    return this.#marketContractInstance.methods.getMarketItems(_nftContractAddress).call();
  }
  async getMarketItemsCount(_nftContractAddress){
    console.log("call getMarketItemsCount")
    return this.#marketContractInstance.methods.getMarketItemsCount(_nftContractAddress).call();
  }
  async getMarketsCount(){
    console.log("call getMarketsCount")
    return this.#marketContractInstance.methods.getMarketsCount().call();
  }
  async getMarketSellingItems(_nftContractAddress){
    console.log("call getMarketSellingItems")
    return this.#marketContractInstance.methods.getMarketSellingItems(_nftContractAddress).call();
  }
  async getMarketSellingItemsCount(_nftContractAddress){
    console.log("call getMarketSellingItemsCount")
    return this.#marketContractInstance.methods.getMarketSellingItemsCount(_nftContractAddress).call();
  }
  async getMarketSoldItems(_nftContractAddress){
    console.log("call getMarketSoldItems")
    return this.#marketContractInstance.methods.getMarketSoldItems(_nftContractAddress).call();
  }
  async getTotalMarketItemsCount(){
    console.log("call getTotalMarketItemsCount")
    return this.#marketContractInstance.methods.getTotalMarketItemsCount().call();
  }
  async getTotalMarketItems(){
    console.log("call getTotalMarketItems")
    return this.#marketContractInstance.methods.getTotalMarketItems().call();
  }
  async getTotalMarketSellingItems(){
    console.log("call getTotalMarketSellingItems")
    return this.#marketContractInstance.methods.getTotalMarketSellingItems().call();
  }
  async getTotalMarketSoldItems(){
    console.log("call getTotalMarketSoldItems")
    return this.#marketContractInstance.methods.getTotalMarketSoldItems().call();
  }
}

class AuctionContractWrapper {
  #nft_auction_address = "0x1DEBff4eeBFB516cf2405Fd3784a8c3BC00475B7";
  #nft_auction_abi = [
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
    this.#auctionContractInstance = new web3.eth.Contract(this.#nft_auction_abi, this.#nft_auction_address);

    this.#setDefaultListingPriceFromBC();
    this.#defaultFromAccount = _fromAddress;
  }

  async #setDefaultListingPriceFromBC(){
    console.log("call #getDefaultListingPriceFromBC")
    let _listingPrice = await this.#auctionContractInstance.methods.getListingPrice().call();
    console.log(`Listing Fee: ${_listingPrice} wei`)
    this.#defaultListingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async addAuctionItem(_nft, _tokenId, _durationMinutes, _startBid) {
    console.log("call addAuctionItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.addAuctionItem(_nft, _tokenId, _durationMinutes, _startBid).send(txOptions);
    return _resultHash;
  }
  async bidAuctionItem(_nft, _tokenId) {
    console.log("call bidAuctionItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.bidAuctionItem(_nft, _tokenId).send(txOptions);
    return _resultHash;
  }
  async endAuctionItem(_nft, _tokenId) {
    console.log("call endAuctionItem")
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    let _resultHash = await this.#auctionContractInstance.methods.endAuctionItem(_nft, _tokenId).send(txOptions);
    return _resultHash;
  }
}

// class ContractWrapper {
//   /* #nft_contract_address = "0x8E49827b568b3906E96d8ea8e739A260813102A4"
//   #nft_contract_abi = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "approved",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Approval",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "ApprovalForAll",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "approve",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "createMarketSale",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "tokenURI",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         }
//       ],
//       "name": "createToken",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "seller",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "sold",
//           "type": "bool"
//         }
//       ],
//       "name": "MarketItemCreated",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         }
//       ],
//       "name": "resellToken",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bytes",
//           "name": "data",
//           "type": "bytes"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "setApprovalForAll",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Transfer",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "transferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "_listingPrice",
//           "type": "uint256"
//         }
//       ],
//       "name": "updateListingPrice",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "balanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "fetchItemsListed",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "tokenId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address payable",
//               "name": "seller",
//               "type": "address"
//             },
//             {
//               "internalType": "address payable",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "price",
//               "type": "uint256"
//             },
//             {
//               "internalType": "bool",
//               "name": "sold",
//               "type": "bool"
//             }
//           ],
//           "internalType": "struct NFTMarketplace.MarketItem[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "fetchMarketItems",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "tokenId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address payable",
//               "name": "seller",
//               "type": "address"
//             },
//             {
//               "internalType": "address payable",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "price",
//               "type": "uint256"
//             },
//             {
//               "internalType": "bool",
//               "name": "sold",
//               "type": "bool"
//             }
//           ],
//           "internalType": "struct NFTMarketplace.MarketItem[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "fetchMyNFTs",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "tokenId",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address payable",
//               "name": "seller",
//               "type": "address"
//             },
//             {
//               "internalType": "address payable",
//               "name": "owner",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "price",
//               "type": "uint256"
//             },
//             {
//               "internalType": "bool",
//               "name": "sold",
//               "type": "bool"
//             }
//           ],
//           "internalType": "struct NFTMarketplace.MarketItem[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getApproved",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getListingPrice",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         }
//       ],
//       "name": "isApprovedForAll",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "name",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownerOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes4",
//           "name": "interfaceId",
//           "type": "bytes4"
//         }
//       ],
//       "name": "supportsInterface",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "symbol",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenURI",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];
//   #nft_marketplace_address = "0x8E49827b568b3906E96d8ea8e739A260813102A4"
//   #nft_marketplace_abi = this.#nft_contract_abi; */

//   #nft_contract_address = "0xe2dD7AC22920958837f58aB8f7eFBCa548b5528c";
//   #nft_contract_abi = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "approved",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Approval",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "ApprovalForAll",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "Transfer",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "approve",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         }
//       ],
//       "name": "balanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "getApproved",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         }
//       ],
//       "name": "isApprovedForAll",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "_tokenURI",
//           "type": "string"
//         }
//       ],
//       "name": "mintToken",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "name",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "ownerOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         },
//         {
//           "internalType": "bytes",
//           "name": "data",
//           "type": "bytes"
//         }
//       ],
//       "name": "safeTransferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "operator",
//           "type": "address"
//         },
//         {
//           "internalType": "bool",
//           "name": "approved",
//           "type": "bool"
//         }
//       ],
//       "name": "setApprovalForAll",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes4",
//           "name": "interfaceId",
//           "type": "bytes4"
//         }
//       ],
//       "name": "supportsInterface",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "symbol",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "tokenURI",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "tokenId",
//           "type": "uint256"
//         }
//       ],
//       "name": "transferFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ];



//   #nftContractInstance;

//   #auctionContractInstance;

//   #defaultFromAccount;
//   #defaultListingPrice;

//   constructor(){
//     console.log("call ContractWrapper constructor")
//     this.#nftContractInstance = new web3.eth.Contract(this.#nft_contract_abi, this.#nft_contract_address);
//     this.#marketContractInstance = new web3.eth.Contract(this.#nft_marketplace_abi, this.#nft_marketplace_address);
//     this.#auctionContractInstance = new web3.eth.Contract(this.#nft_auction_abi, this.#nft_auction_address);

//     this.#setDefaultListingPriceFromBC();
//   }

//   /**
//    * default variable setter
//    */
//   setDefaultFromAccount(_account){
//     console.log("call setDefaultFromAccount")
//     this.#defaultFromAccount = _account;
//   }
//   setDefaultListingPrice(_listingPrice){
//     console.log("call setDefaultListingPrice")
//     this.#defaultListingPrice = _listingPrice;
//   }


//   /////////////////////////////////////////////
//   // Payable function
//   /////////////////////////////////////////////
//   /**
//    * createMarketSale buy nft
//    * @param {Number | String} _tokenId
//    * @param {Number} _price
//    * @returns {String} _resultHash
//    */
//   async createMarketSale(_tokenId, _price) {
//     console.log("call createMarketSale")
//     let txOptions = {
//       from: this.#defaultFromAccount,
//       value: Number(_price) // wei
//     }
//     let _resultHash = await this.#marketContractInstance.methods.createMarketSale(_tokenId).send(txOptions);
//     return _resultHash;
//   }

//   /**
//    * @function createTokenWithPrice
//    * @param {String} _tokenURI ipfs URI for metadata
//    * @param {String} _price wei
//    * @returns {String} _resultHash
//    */
//    async createTokenWithPrice(_tokenURI="", _price=""){
//     // v4 테스트
//     console.log("call createToken in class")

//     let txOptions = {
//       from: this.#defaultFromAccount,
//       value: this.#defaultListingPrice // wei
//     }
//     let _resultHash = await this.#marketContractInstance.methods.createToken(_tokenURI, _price).send(txOptions);
//     return _resultHash;
//   }

//   /**
//    * resellToken
//    * @param {Number | String} _tokenId
//    * @param {Number} _price
//    * @returns {String} _resultHash
//    */
//   async resellToken(_tokenId, _price) {
//     console.log("call resellToken")
//     let txOptions = {
//       from: this.#defaultFromAccount,
//       value: this.#defaultListingPrice // wei
//     }
//     let _resultHash = await this.#marketContractInstance.methods.resellToken(_tokenId, _price).send(txOptions);
//     return _resultHash;
//   }

//   /**
//    * updateListingPrice Owner only
//    * @param {Number} _listingPrice
//    * @returns {String} _resultHash
//    */
//   async updateListingPrice(_listingPrice) {
//     console.log("call updateListingPrice")
//     let txOptions = {
//       from: this.#defaultFromAccount,
//       value: this.#defaultListingPrice // wei
//     }
//     let _resultHash = await this.#marketContractInstance.methods.updateListingPrice(_listingPrice).send(txOptions);
//     return _resultHash;
//   }



//   /////////////////////////////////////////////
//   // Public function
//   /////////////////////////////////////////////


//   /**
//    * fetchItemsListed
//    * @returns {Object[]} _itemsListed
//    */
//   async fetchItemsListed(){
//     console.log("call fetchItemsListed")
//     let _itemsListed = await this.#marketContractInstance.methods.fetchItemsListed().call();
//     return _itemsListed;
//   }

//   /**
//    * fetchMarketItems
//    * @returns {Object[]} _itemsListed
//    */
//   async fetchMarketItems(){
//     console.log("call fetchMarketItems")
//     let _itemsListed = await this.#marketContractInstance.methods.fetchMarketItems().call();
//     return _itemsListed;
//   }

//   /**
//    * fetchMyNFTs
//    * @returns {Object[]} _itemsListed
//    */
//   async fetchMyNFTs(){
//     console.log("call fetchMyNFTs")
//     let _itemsListed = await this.#marketContractInstance.methods.fetchMyNFTs().call();
//     return _itemsListed;
//   }

//   /**
//    * getApproved
//    * @param {Number | String} _tokenId
//    * @returns _address
//    */


//   /**
//    * getListingPrice
//    * @returns _price
//    */
//   async getListingPrice(){
//     console.log("call getListingPrice")
//     let _price = await this.#marketContractInstance.methods.getListingPrice().call();
//     return _price;
//   }


// }
