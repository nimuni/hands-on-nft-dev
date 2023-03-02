const _emptyFunc = () => {}

const isAvailableMarketItem = (marketItemInfo) => {
  // nft: "0x31C68d48E117C778696238818A995CeFF6D779Db"
  // nftId: "1"
  // owner: "0xAddF4475192878D52774e8270a477C1a3e808eaa"
  // price: "1000000000000000000"
  // seller: "0x0000000000000000000000000000000000000000"
  // sold: true
  const isNull = isNullAddress(marketItemInfo.seller)
  if(!isNull && marketItemInfo.sold == false){
    return true;
  } else {
    return false;
  }
}
const isAvailableAuctionItem = (auctionItemInfo) => {
  // endAt: "0"
  // ended: false
  // highestBid: "0"
  // highestBidder: "0x0000000000000000000000000000000000000000"
  // seller: "0x0000000000000000000000000000000000000000"
  // startAt: "0"
  const isNull = isNullAddress(auctionItemInfo.seller);
  const auctionEndTime = getDateFromBlocktime(auctionItemInfo.endAt).getTime();
  const auctionStartTime = getDateFromBlocktime(auctionItemInfo.startAt).getTime();
  const nowTime = new Date().getTime();
  if(!isNull && (auctionItemInfo.ended == false || nowTime < auctionEndTime)){
    return true;
  } else {
    return false;
  }
}

class BasicContractWrapper {
  #defaultFromAccount;
  #address;
  #abi;
  #instance;

  constructor(contractAddress, walletAddress){
    this.setAddress(contractAddress)
    this.setDefaultFromAccount(walletAddress)
  }
  initInstance(newAddress){
    if(newAddress) {
      this.setAddress(newAddress);
    }

    this.#instance = new web3.eth.Contract(this.getABI(), this.getAddress());
  }
  getInstance(){
    return this.#instance;
  }
  getDefaultFromAccount(){
    return this.#defaultFromAccount;
  }
  setDefaultFromAccount(walletAddress){
    if(walletAddress) this.#defaultFromAccount = walletAddress;
  }
  getAddress(){
    return this.#address;
  }
  setAddress(address){
    return this.#address = address;
  }
  getABI(){
    return this.#abi;
  }
  setABI(abi){
    this.#abi = abi
  }
  getPastEvents({eventName, fromBlock, toBlock, tokenId, nftId, callback}){
    console.log("call getPastEvents")
    return new Promise((resolve, reject) => {
      if(this.getInstance()){
        let option = {
          fromBlock: fromBlock || 0,
          toBlock: toBlock || 'latest',
        }

        if(tokenId) option.filter = { tokenId : tokenId };
        if(nftId) option.filter = { nftId : nftId };
        console.log(option)


        const defaultCallback = (error, events) => {
          if (error) {
            reject(error)
          } else {
            resolve(events);
          }
        }

        this.getInstance().getPastEvents(
          eventName,
          option,
          callback || defaultCallback
        )
      } else {
        reject("no instance");
      }

    })
  }
}
class NftContractWrapperV2 extends BasicContractWrapper {
  #address = "0x31C68d48E117C778696238818A995CeFF6D779Db";
  #abi = [
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
  ];

  constructor(contractAddress="0x31C68d48E117C778696238818A995CeFF6D779Db", defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(this.#abi);
    this.initInstance(this.#address)
  }

  /////////////////////////////////////////////
  // Transact function
  /////////////////////////////////////////////
  async approve(_to, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.approve(_to, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async mintToken(_to, _tokenURI, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    let result = this.getInstance().methods.mintToken(_to, _tokenURI).send(txOptions);
    return result
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc)
  }
  async safeTransferFrom(_from, _to, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.safeTransferFrom(_from, _to, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async safeTransferFrom(_from, _to, _tokenId, _data, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.safeTransferFrom(_from, _to, _tokenId, _data).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setApprovalForAll(_operator, _approved=false, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.setApprovalForAll(_operator, _approved).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async transferFrom(_from, _to, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.transferFrom(_from, _to, _tokenId).send(txOptions)
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
    return this.getInstance().methods.balanceOf(_owner).call();
  }
  async getApproved(_tokenId){
    return this.getInstance().methods.getApproved(_tokenId).call();
  }
  async isApprovedForAll(_owner, _operator){
    return this.getInstance().methods.isApprovedForAll(_owner, _operator).call();
  }
  async name(){
    return this.getInstance().methods.name().call();
  }
  async ownerOf(_tokenId){
    return this.getInstance().methods.ownerOf(_tokenId).call();
  }
  async supportsInterface(_interfaceId){
    return this.getInstance().methods.supportsInterface(_interfaceId).call();
  }
  async symbol(){
    return this.getInstance().methods.symbol().call();
  }
  async tokenURI(_tokenId){
    return this.getInstance().methods.tokenURI(_tokenId).call();
  }
  async totalSupply(_tokenId){
    return this.getInstance().methods.totalSupply().call();
  }
  async getCreatorNFTIds(_creatorAddress){
    return this.getInstance().methods.getCreatorNFTIds(_creatorAddress).call();
  }
}

class MarketContractWrapperV2 extends BasicContractWrapper {
  #address = "0x402958d9c196565502b8aae325f6c9b252690e60";
  #abi = [
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
        }
      ],
      "name": "cancelListedItem",
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
        }
      ],
      "name": "MarketItemListcancel",
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
          "internalType": "uint256",
          "name": "_listingPriceWei",
          "type": "uint256"
        }
      ],
      "name": "setListingPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setMarketOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "getItemInfoOnMarket",
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
          "internalType": "struct NFTMarketplace.MarketItem",
          "name": "",
          "type": "tuple"
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
      "name": "getMarkets",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
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
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
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
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
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
    },
    {
      "inputs": [],
      "name": "getVersion",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  #listingPrice;

  constructor(contractAddress="0x402958d9c196565502b8aae325f6c9b252690e60", defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(this.#abi);
    this.initInstance(this.#address)
    this.#setListingPriceFromChain();
  }
  async #setListingPriceFromChain(){
    let _listingPrice = await this.getInstance().methods.getListingPrice().call();
    this.#listingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async buyMarketItem(_nftContractAddress, _nftId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: option.value // wei
    }
    return this.getInstance().methods.buyMarketItem(_nftContractAddress, _nftId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async listingMarketItem(_nftContractAddress, _nftId, _price, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(this.#listingPrice) // wei
    }
    return this.getInstance().methods.listingMarketItem(_nftContractAddress, _nftId, _price).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async cancelListedItem(_nftContractAddress, _nftId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.cancelListedItem(_nftContractAddress, _nftId, _price).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  async offerMarketItem(_nftContractAddress, _nftId, _endTime, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(option.value) // wei
    }
    return this.getInstance().methods.offerMarketItem(_nftContractAddress, _nftId, _endTime).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async acceptOffer(_nftContractAddress, _tokenId, _offerIndex, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      // value: Number(this.#defaultListingPrice) // wei
    }
    return this.getInstance().methods.acceptOffer(_nftContractAddress, _tokenId, _offerIndex).send(txOptions)
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
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.withdrawOutdatedOffer(_nftContractAddress, _tokenId, _offerIndex).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setListingPrice(_listingPriceWei, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.setListingPrice(_listingPriceWei).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setMarketOwner(_newOwner, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.setMarketOwner(_newOwner).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getVersion(){
    return this.getInstance().methods.getVersion().call();
  }
  async getMarkets(){
    return this.getInstance().methods.getMarkets().call();
  }
  async getListingPrice(){
    return this.getInstance().methods.getListingPrice().call();
  }
  async getMarketItems(_nftContractAddress){
    return this.getInstance().methods.getMarketItems(_nftContractAddress).call();
  }
  async getMarketItemsCount(_nftContractAddress){
    return this.getInstance().methods.getMarketItemsCount(_nftContractAddress).call();
  }
  async getMarketsCount(){
    return this.getInstance().methods.getMarketsCount().call();
  }
  async getMarketSellingItems(_nftContractAddress){
    return this.getInstance().methods.getMarketSellingItems(_nftContractAddress).call();
  }
  async getMarketSellingItemsCount(_nftContractAddress){
    return this.getInstance().methods.getMarketSellingItemsCount(_nftContractAddress).call();
  }
  async getMarketSoldItems(_nftContractAddress){
    return this.getInstance().methods.getMarketSoldItems(_nftContractAddress).call();
  }
  async getItemInfoOnMarket(_nftContractAddress, _tokenId){
    return this.getInstance().methods.getItemInfoOnMarket(_nftContractAddress, _tokenId).call();
  }
  async getTotalMarketItemsCount(){
    return this.getInstance().methods.getTotalMarketItemsCount().call();
  }
  async getTotalMarketItems(){
    return this.getInstance().methods.getTotalMarketItems().call();
  }
  async getTotalMarketSellingItems(){
    return this.getInstance().methods.getTotalMarketSellingItems().call();
  }
  async getTotalMarketSoldItems(){
    return this.getInstance().methods.getTotalMarketSoldItems().call();
  }
  async getOfferList(_nftContractAddress, _tokenId){
    return this.getInstance().methods.getOfferList(_nftContractAddress, _tokenId).call();
  }
  async getMyOutdatedOffers(_nftContractAddress, _tokenId){
    return this.getInstance().methods.getMyOutdatedOffers(_nftContractAddress, _tokenId).call();
  }
}

class AuctionContractWrapperV2 extends BasicContractWrapper {
  #address = "0xE653C891DFbF7C41A0490cC6344b5bED6bcda942";
  #abi = [
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
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startAt",
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
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
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
          "name": "bid",
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
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
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
          "name": "_startAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endAt",
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
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "bidAuctionItem",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
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
        }
      ],
      "name": "endAuctionItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
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
        }
      ],
      "name": "getAuctionCurrentCount",
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
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "getItemInfoOnAuction",
      "outputs": [
        {
          "components": [
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
          "internalType": "struct AuctionMarket.AuctionInfo",
          "name": "",
          "type": "tuple"
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
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "getMyAuctionBid",
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
      "name": "getVersion",
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
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setAuctionOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_listingPriceWei",
          "type": "uint256"
        }
      ],
      "name": "setListingPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "name": "_count",
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
  #listingPrice;
  constructor(contractAddress="0xE653C891DFbF7C41A0490cC6344b5bED6bcda942", defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(this.#abi);
    this.initInstance(this.#address);
    this.#setListingPriceFromChain();
  }
  async #setListingPriceFromChain(){
    let _listingPrice = await this.getInstance().methods.getListingPrice().call();
    this.#listingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async addAuctionItem(_nft, _tokenId, _startAt, _endAt, _startBid, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(this.#listingPrice) // wei
    }
    return this.getInstance().methods.addAuctionItem(_nft, _tokenId, _startAt, _endAt, _startBid).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async bidAuctionItem(_nft, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(option.value) // wei
    }
    return this.getInstance().methods.bidAuctionItem(_nft, _tokenId).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async withdrawFromAuction(_nft, _tokenId, _count, option) {
    let txOptions = {
      from: this.getDefaultFromAccount()
    }
    return this.getInstance().methods.withdrawFromAuction(_nft, _tokenId, _count).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async endAuctionItem(_nft, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(this.#listingPrice) // wei
    }
    return this.getInstance().methods.endAuctionItem(_nft, _tokenId).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getVersion(){
    return this.getInstance().methods.getVersion().call();
  }
  async getListingPrice(){
    return this.getInstance().methods.getListingPrice().call();
  }
  async getItemInfoOnAuction(_nft, _tokenId, _count){
    return this.getInstance().methods.getItemInfoOnAuction(_nft, _tokenId, _count).call();
  }
  async getMyAuctionBid(_nft, _tokenId, _count){
    return this.getInstance().methods.getMyAuctionBid(_nft, _tokenId, _count).call();
  }
  async getAuctionCurrentCount(_nft, _tokenId){
    return this.getInstance().methods.getAuctionCurrentCount(_nft, _tokenId).call();
  }
}
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

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
  #nftContractInstance;
  #defaultFromAccount;

  constructor(_fromAddress, _nftAddress){
    this.initNFTInstance(_nftAddress);

    this.#defaultFromAccount = _fromAddress;
  }

  initNFTInstance(_nftAddress="0x31C68d48E117C778696238818A995CeFF6D779Db"){
    this.#nftContractInstance = new web3.eth.Contract(this.#nft_abi, _nftAddress);
  }

  /////////////////////////////////////////////
  // Class Util function
  /////////////////////////////////////////////
  getPastEvents({eventName, fromBlock, toBlock, tokenId, callback}){
    // Transfer
    // Approval
    // ApprovalForAll
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
        eventName,
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
  // v7
  // #market_address = "0x6B88E7102a55B81AD0BDc11A05d114F0738bCE58";
  // v8
  #market_address = "0x402958d9c196565502b8aae325f6c9b252690e60";
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
        }
      ],
      "name": "cancelListedItem",
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
        }
      ],
      "name": "MarketItemListcancel",
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
          "internalType": "uint256",
          "name": "_listingPriceWei",
          "type": "uint256"
        }
      ],
      "name": "setListingPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setMarketOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "getItemInfoOnMarket",
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
          "internalType": "struct NFTMarketplace.MarketItem",
          "name": "",
          "type": "tuple"
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
      "name": "getMarkets",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
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
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
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
              "name": "nft",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nftId",
              "type": "uint256"
            },
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
    },
    {
      "inputs": [],
      "name": "getVersion",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
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

  getPastEvents({eventName, fromBlock, toBlock, callback}){
    // MarketItemListed
    // MarketItemSold
    // MarketItemListcancel
    // MarketItemOffer
    // OfferAccept
    return new Promise((resolve, reject) => {
      let option = {
        fromBlock: fromBlock || 0,
        toBlock: toBlock || 'latest',
      }

      const defaultCallback = (error, events) => {
        if (error) {
          reject(error)
        } else {
          resolve(events);
        }
      }

      this.#marketContractInstance.getPastEvents(
        eventName,
        option,
        callback || defaultCallback
      )
    })
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async buyMarketItem(_nftContractAddress, _nftId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: option.value // wei
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
    return this.#marketContractInstance.methods.listingMarketItem(_nftContractAddress, _nftId, _price).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async cancelListedItem(_nftContractAddress, _nftId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
    }
    return this.#marketContractInstance.methods.cancelListedItem(_nftContractAddress, _nftId, _price).send(txOptions)
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
    }
    return this.#marketContractInstance.methods.withdrawOutdatedOffer(_nftContractAddress, _tokenId, _offerIndex).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setListingPrice(_listingPriceWei, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
    }
    return this.#marketContractInstance.methods.setListingPrice(_listingPriceWei).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setMarketOwner(_newOwner, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
    }
    return this.#marketContractInstance.methods.setMarketOwner(_newOwner).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getVersion(){
    return this.#marketContractInstance.methods.getVersion().call();
  }
  async getMarkets(){
    return this.#marketContractInstance.methods.getMarkets().call();
  }
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
  async getItemInfoOnMarket(_nftContractAddress, _tokenId){
    return this.#marketContractInstance.methods.getItemInfoOnMarket(_nftContractAddress, _tokenId).call();
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
  #auction_address = "0xE653C891DFbF7C41A0490cC6344b5bED6bcda942";
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
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startAt",
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
          "internalType": "address",
          "name": "nft",
          "type": "address"
        },
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
          "name": "bid",
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
          "name": "nft",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
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
          "name": "_startAt",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endAt",
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
          "internalType": "address",
          "name": "_nft",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "bidAuctionItem",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
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
        }
      ],
      "name": "endAuctionItem",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
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
        }
      ],
      "name": "getAuctionCurrentCount",
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
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "getItemInfoOnAuction",
      "outputs": [
        {
          "components": [
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
          "internalType": "struct AuctionMarket.AuctionInfo",
          "name": "",
          "type": "tuple"
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
          "name": "_count",
          "type": "uint256"
        }
      ],
      "name": "getMyAuctionBid",
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
      "name": "getVersion",
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
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setAuctionOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_listingPriceWei",
          "type": "uint256"
        }
      ],
      "name": "setListingPrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
          "name": "_count",
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

  getPastEvents({eventName, fromBlock, toBlock, callback}){
    // AuctionAdded
    // AuctionBided
    // AuctionEnded
    return new Promise((resolve, reject) => {
      let option = {
        fromBlock: fromBlock || 0,
        toBlock: toBlock || 'latest',
      }

      const defaultCallback = (error, events) => {
        if (error) {
          reject(error)
        } else {
          resolve(events);
        }
      }

      this.#auctionContractInstance.getPastEvents(
        eventName,
        option,
        callback || defaultCallback
      )
    })
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
  async addAuctionItem(_nft, _tokenId, _startAt, _endAt, _startBid, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    return this.#auctionContractInstance.methods.addAuctionItem(_nft, _tokenId, _startAt, _endAt, _startBid).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async bidAuctionItem(_nft, _tokenId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(option.value) // wei
    }
    return this.#auctionContractInstance.methods.bidAuctionItem(_nft, _tokenId).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async withdrawFromAuction(_nft, _tokenId, _count, option) {
    let txOptions = {
      from: this.#defaultFromAccount
    }
    return this.#auctionContractInstance.methods.withdrawFromAuction(_nft, _tokenId, _count).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async endAuctionItem(_nft, _tokenId, option) {
    let txOptions = {
      from: this.#defaultFromAccount,
      value: Number(this.#defaultListingPrice) // wei
    }
    return this.#auctionContractInstance.methods.endAuctionItem(_nft, _tokenId).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getVersion(){
    return this.#auctionContractInstance.methods.getVersion().call();
  }
  async getListingPrice(){
    return this.#auctionContractInstance.methods.getListingPrice().call();
  }
  async getItemInfoOnAuction(_nft, _tokenId, _count){
    return this.#auctionContractInstance.methods.getItemInfoOnAuction(_nft, _tokenId, _count).call();
  }
  async getMyAuctionBid(_nft, _tokenId, _count){
    return this.#auctionContractInstance.methods.getMyAuctionBid(_nft, _tokenId, _count).call();
  }
  async getAuctionCurrentCount(_nft, _tokenId){
    return this.#auctionContractInstance.methods.getAuctionCurrentCount(_nft, _tokenId).call();
  }

  /////////////////////////////////////////////
  // Wrapper function
  /////////////////////////////////////////////
  getAddress(){
    return this.#auction_address;
  }
}
