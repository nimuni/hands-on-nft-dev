const MAIN_NET_ID = 1;
const GOERLI_NET_ID = 5;
const SEPOLIA_NET_ID = 11155111;

const ERC1155 = "ERC-1155";
const ERC721 = "ERC-721";

const defaultContractAddressObj = {}
defaultContractAddressObj[MAIN_NET_ID] = {
  'erc721':"",
  'erc1155':"",
  'market':"",
  'auction':"",
}
defaultContractAddressObj[GOERLI_NET_ID] = {
  'erc721':"0xBCC141aE0fa4d52F0a07F6AbB989D5f5ACeE4238",
  'erc1155':"0xbE8b950E5207aAd3a3D69952331DED40105df5EB",
  'market':"0x216e7FaC8E329EccB686b34dD57Ff52a57D7964f",
  'auction':"0x094936a6ba1972b27758b7cc52c489e9114066e2",
},
defaultContractAddressObj[SEPOLIA_NET_ID] = {
  'erc721':"0x742Dd089F29373CF4418f689Bc715fc9D1B37522",
  'erc1155':"0x725CcA4b7320910df880276B1fabBAA68976006C",
  // 'market':"0xdcf2CD1625912a664D65c4Faee5081ACc6023B5A",
  // 'auction':"0xD632775d9571a5b28bEc9b56AA510b8cA44d8dcE",
  'market':"0x167C41404Cb0b8FF8EDb2A59c521D5FeA13ef1C5",
  'auction':"0x3a8dB8a2Db7FBDedDc2dA276B7a72D2CfC9841A8",
}

// 새 마켓, 경매 정보. 테스트필요
MARKET_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "remainAmountToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmountToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_pricePerPiece",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_startAt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_endAt",
				"type": "uint256"
			}
		],
		"name": "MarketAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "remainAmountToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmountToken",
				"type": "uint256"
			}
		],
		"name": "MarketCancel",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "remainAmountToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalAmountToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_pricePerPiece",
				"type": "uint256"
			}
		],
		"name": "MarketSold",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offerCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "offerer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_pricePerPiece",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			}
		],
		"name": "OfferAccept",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "marketDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offerCount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "offerer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_pricePerPiece",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			}
		],
		"name": "OfferItem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "URI_SETTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketDataId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerCount",
				"type": "uint256"
			}
		],
		"name": "acceptOffer",
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
				"internalType": "uint256",
				"name": "_marketDataId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfToken",
				"type": "uint256"
			}
		],
		"name": "buyMarketToken",
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
				"internalType": "uint256",
				"name": "_marketDataId",
				"type": "uint256"
			}
		],
		"name": "cancelMarketData",
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
				"internalType": "uint256",
				"name": "_marketDataId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_offerCount",
				"type": "uint256"
			}
		],
		"name": "cancelOffer",
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
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenERCType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalAmountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerPiece",
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
			}
		],
		"name": "createMarketData",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "escrowAmount",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fee",
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
		"name": "getTime",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_marketDataId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfToken",
				"type": "uint256"
			}
		],
		"name": "makeOffer",
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
		"inputs": [],
		"name": "marketDataId",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "marketDatas",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "remainAmountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmountToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pricePerPiece",
				"type": "uint256"
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
				"name": "sold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "marketFee",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offerCount",
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
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offerDatas",
		"outputs": [
			{
				"internalType": "address",
				"name": "offerer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "pricePerPiece",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAccepted",
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
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "onlyGrant",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "recipient",
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
		"inputs": [],
		"name": "recipientCount",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "uint256",
				"name": "_marketFee",
				"type": "uint256"
			}
		],
		"name": "setMarketFee",
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
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
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
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_remainAmountToken",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
				"internalType": "address[]",
				"name": "_recipient",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_fee",
				"type": "uint256[]"
			}
		],
		"name": "updateFeeAndRecipient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

AUCTION_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startPrice",
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
			}
		],
		"name": "AuctionAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionDataId",
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
		"name": "AuctionBided",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionDataId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOfToken",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "URI_SETTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionDataId",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctionDatas",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenERCType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOfToken",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "highestBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minIncrement",
				"type": "uint256"
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "auctionFee",
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
				"name": "_auctionDataId",
				"type": "uint256"
			}
		],
		"name": "cancelAuction",
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
				"internalType": "uint256",
				"name": "_auctionDataId",
				"type": "uint256"
			}
		],
		"name": "claimAuction",
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
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenERCType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_minIncrement",
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
			}
		],
		"name": "createAuctionSales",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "fee",
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
		"name": "getTime",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155BatchReceived",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC1155Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "onlyGrant",
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
				"internalType": "uint256",
				"name": "_auctionDataId",
				"type": "uint256"
			}
		],
		"name": "placeBid",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "recipient",
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
		"inputs": [],
		"name": "recipientCount",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "uint256",
				"name": "_auctionFee",
				"type": "uint256"
			}
		],
		"name": "setAuctionFee",
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
		"name": "setAuctionOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
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
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_receiver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOfToken",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
				"internalType": "address[]",
				"name": "_recipient",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_fee",
				"type": "uint256[]"
			}
		],
		"name": "updateFeeAndRecipient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const ERC721_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
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
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
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
		"name": "MintToken",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
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
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
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
				"name": "_to",
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
		"inputs": [],
		"name": "onlyGrant",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
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
	},
	{
		"inputs": [],
		"name": "version",
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

const ERC1155_CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
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
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "burnBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "_amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_ids",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "mintBatch",
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
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "MintToken",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
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
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
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
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
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
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
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
				"name": "operator",
				"type": "address"
			},
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
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
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
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
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
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
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
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "exists",
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
				"name": "account",
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
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "onlyGrant",
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
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "bytes4",
				"name": "_interfaceId",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "uri",
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
		"name": "URI_SETTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "version",
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
/*
const MARKET_CONTRACT_ABI_regacy = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
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
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
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
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
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
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offerIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "OfferAccept",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "offerIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "offerer",
				"type": "address"
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
		"name": "OfferItem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
				"name": "_tokenId",
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
				"name": "_tokenId",
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
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getMarketInfo",
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
						"name": "tokenId",
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
		"name": "getOfferDetail",
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
						"name": "tokenId",
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
				"internalType": "struct NFTMarketplace.OfferDetail",
				"name": "",
				"type": "tuple"
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
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
		"name": "listingPrice",
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
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
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
		"inputs": [],
		"name": "onlyGrant",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "version",
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
	}
];

const AUCTION_CONTRACT_ABI_regacy = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			}
		],
		"name": "OnlyRole",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionCount",
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
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionCount",
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
				"indexed": true,
				"internalType": "address",
				"name": "nft",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "auctionCount",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "GrantRole",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "RevokeRole",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AUCTION_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MARKET_LISTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listingPrice",
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
		"name": "onlyGrant",
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
				"internalType": "bytes32",
				"name": "_role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roles",
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
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			}
		],
		"name": "setOnlyGrant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "version",
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
 */
const _emptyFunc = () => {
}

const getDefaultMethodOption = (label="요청", callback) => {
  return {
    receipt: (receipt)=>{
      if(receipt.status) {
        console.log(`${label}을(를) 완료되었습니다.`)
        alert(`${label} 완료`)
        window.location.reload()
      } else {
        console.log(`${label}을(를) 실패되었습니다.`)
        console.log(receipt)
        console.warn(`receipt.status=${receipt.status}`)
        alert(`${label} 실패`)
      }
      if(callback) callback()
    },
    error: (error, receipt)=>{
      console.error("event error")
      console.log(error)
      console.log(receipt)
      alert(`${label} 실패`)
      if(callback) callback()
    }
  }
}
const getDefaultMethodOptionCallback = (label="요청", callback, errorCallback) => {
  return {
    receipt: (receipt)=>{
      if(receipt.status) {
        console.log(`${label}을(를) 완료했습니다.`)
        if(callback) callback(receipt)
      } else {
        console.log(`${label}을(를) 실패했습니다.`)
        console.log(receipt)
        console.warn(`receipt.status=${receipt.status}`)
        if(errorCallback) errorCallback(null, receipt)
      }
    },
    error: (error, receipt)=>{
      console.error("event error")
      console.log(error)
      console.log(receipt)
      if(errorCallback) errorCallback(error, receipt)
    }
  }
}

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
  getPastEvents({eventName, fromBlock, toBlock, tokenId, nftId, from, to, callback}){
    return new Promise((resolve, reject) => {
      if(this.getInstance()){
        let option = {
          fromBlock: fromBlock || 0,
          toBlock: toBlock || 'latest',
          filter: {}
        }

        if(tokenId) option.filter.tokenId = tokenId;
        if(nftId) option.filter.nftId = nftId;
        if(isAddress(from)) option.filter.from = from;
        if(isAddress(to)) option.filter.to = to;

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
  async version(){
    return await this.getInstance().methods.version().call();
  }
  async estimateGasFee(methodName, ...args){
    const gasAmount = await this.getInstance().methods[methodName](...args).estimateGas({from:this.getDefaultFromAccount()})
    const gasPrice = await web3.eth.getGasPrice();
    const estimatedWeiCost = gasAmount * gasPrice;
    // ETH 가격으로 보고싶으면 web3.utils.fromWei(estimatedWeiCost)
    return estimatedWeiCost
  }
}

class OwnableContractWrapper extends BasicContractWrapper {
  constructor(contractAddress, walletAddress){
    super(contractAddress, walletAddress)
  }
  async onlyGrant(){
    return await this.getInstance().methods.onlyGrant().call();
  }
  async ADMIN_ROLE(){
    return await this.getInstance().methods.ADMIN_ROLE().call();
  }
  async MINTER_ROLE(){
    return await this.getInstance().methods.MINTER_ROLE().call();
  }
  async URI_SETTER_ROLE(){
    return await this.getInstance().methods.URI_SETTER_ROLE().call();
  }
  async MARKET_LISTER_ROLE(){
    return await this.getInstance().methods.MARKET_LISTER_ROLE().call();
  }
  async AUCTION_LISTER_ROLE(){
    return await this.getInstance().methods.AUCTION_LISTER_ROLE().call();
  }

  setOnlyGrant(value, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.setOnlyGrant(value).send(txOptions)
      .on('sending', option.sending || _emptyFunc)
      .on('sent', option.sent || _emptyFunc)
      .on('transactionHash', option.transactionHash || _emptyFunc)
      .on('receipt', option.receipt || _emptyFunc)
      .on('error', option.error || _emptyFunc);
  }
  grantRole(_role, _account, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.grantRole(_role, _account).send(txOptions)
      .on('sending', option.sending || _emptyFunc)
      .on('sent', option.sent || _emptyFunc)
      .on('transactionHash', option.transactionHash || _emptyFunc)
      .on('receipt', option.receipt || _emptyFunc)
      .on('error', option.error || _emptyFunc);
  }
  revokeRole(_role, _account, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.revokeRole(_role, _account).send(txOptions)
      .on('sending', option.sending || _emptyFunc)
      .on('sent', option.sent || _emptyFunc)
      .on('transactionHash', option.transactionHash || _emptyFunc)
      .on('receipt', option.receipt || _emptyFunc)
      .on('error', option.error || _emptyFunc);
  }
  async roles(roles, address){
    return await this.getInstance().methods.roles(roles, address).call();
  }
}
/*
class NftContract721Wrapper extends OwnableContractWrapper {
  constructor(contractAddress=defaultContractAddressObj[networkId].erc721, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    // this.setABI(this.#abi);
    this.setABI(ERC721_CONTRACT_ABI);
    this.initInstance(contractAddress)
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
}

class NftContract1155Wrapper extends OwnableContractWrapper {
  constructor(contractAddress=defaultContractAddressObj[networkId].erc1155, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(ERC1155_CONTRACT_ABI);
    this.initInstance(contractAddress)
  }

  /////////////////////////////////////////////
  // Transact function
  /////////////////////////////////////////////
  async burn(_account, _tokenId, _value, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.burn(_account, _tokenId, _value).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async setApprovalForAll(_operator, _approved, option) {
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
  async safeTransferFrom(_from, _to, _tokenId, _amount, _data, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.safeTransferFrom(_from, _to, _tokenId, _amount, _data).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async safeBatchTransferFrom(_from, _to, _tokenIdArray, _amountArray, _data, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.safeBatchTransferFrom(_from, _to, _tokenIdArray, _amountArray, _data).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async burnBatch(_account, _tokenIdArray, _valueArray, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.burnBatch(_account, _tokenIdArray, _valueArray).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async mint(_to, _amount, _tokenURI, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.mint(_to, _amount, _tokenURI).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async mintBatch(_to, _amountArray, _tokenURIArray, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.mintBatch(_to, _amountArray, _tokenURIArray).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async balanceOf(_owner, _tokenId){
    return this.getInstance().methods.balanceOf(_owner, _tokenId).call();
  }
  async totalSupply(_tokenId){
    return this.getInstance().methods.totalSupply(_tokenId).call();
  }
  async balanceOfBatch(_ownerArray, _tokenIdArray){
    return this.getInstance().methods.balanceOfBatch(_ownerArray, _tokenIdArray).call();
  }
  async isApprovedForAll(_account, _operator){
    return this.getInstance().methods.isApprovedForAll(_account, _operator).call();
  }
  async supportsInterface(_interfaceId){
    console.log("call in wrapper supportsInterface", _interfaceId)
    return this.getInstance().methods.supportsInterface(_interfaceId).call();
  }
  async uri(_tokenId){
    return this.getInstance().methods.uri(_tokenId).call();
  }
}

class MarketContractWrapper extends OwnableContractWrapper {
  #listingPrice;

  constructor(contractAddress=defaultContractAddressObj[networkId].market, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(MARKET_CONTRACT_ABI);
    this.initInstance(contractAddress)
    this.#setListingPriceFromChain();
  }
  async #setListingPriceFromChain(){
    let _listingPrice = await this.getInstance().methods.listingPrice().call();
    this.#listingPrice = _listingPrice;
  }

  /////////////////////////////////////////////
  // Payable function
  /////////////////////////////////////////////
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
  async buyMarketItem(_nftContractAddress, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: option.value // wei
    }
    return this.getInstance().methods.buyMarketItem(_nftContractAddress, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async cancelListedItem(_nftContractAddress, _tokenId, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
    }
    return this.getInstance().methods.cancelListedItem(_nftContractAddress, _tokenId).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async listingMarketItem(_nftContractAddress, _tokenId, _price, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(this.#listingPrice) // wei
    }
    return this.getInstance().methods.listingMarketItem(_nftContractAddress, _tokenId, _price).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }
  async offerMarketItem(_nftContractAddress, _tokenId, _endTime, option) {
    let txOptions = {
      from: this.getDefaultFromAccount(),
      value: Number(option.value) // wei
    }
    return this.getInstance().methods.offerMarketItem(_nftContractAddress, _tokenId, _endTime).send(txOptions)
            .on('sending', option.sending || _emptyFunc)
            .on('sent', option.sent || _emptyFunc)
            .on('transactionHash', option.transactionHash || _emptyFunc)
            .on('receipt', option.receipt || _emptyFunc)
            .on('error', option.error || _emptyFunc);
  }


  /////////////////////////////////////////////
  // external function
  /////////////////////////////////////////////
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

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getMarketInfo(_nftContractAddress, _tokenId){
    return this.getInstance().methods.getMarketInfo(_nftContractAddress, _tokenId).call();
  }
  async getMarketItemsCount(_nftContractAddress){
    return this.getInstance().methods.getMarketItemsCount(_nftContractAddress).call();
  }
  async getMarkets(){
    return this.getInstance().methods.getMarkets().call();
  }
  async getMarketsCount(){
    return this.getInstance().methods.getMarketsCount().call();
  }
  async getMarketSellingItemsCount(_nftContractAddress){
    return this.getInstance().methods.getMarketSellingItemsCount(_nftContractAddress).call();
  }
  async getOfferDetail(_nftContractAddress, _tokenId, _offerIndex){
    return this.getInstance().methods.getOfferDetail(_nftContractAddress, _tokenId, _offerIndex).call();
  }
  async getTotalMarketItemsCount(){
    return this.getInstance().methods.getTotalMarketItemsCount().call();
  }
  async listingPrice(){
    return await this.getInstance().methods.listingPrice().call();
  }
  getPastEvents({eventName, fromBlock, toBlock, tokenId, nftId, offerIndex, callback}){
    return new Promise((resolve, reject) => {
      if(this.getInstance()){
        let option = {
          fromBlock: fromBlock || 0,
          toBlock: toBlock || 'latest',
          filter: {}
        }

        if(tokenId) option.filter.tokenId = tokenId;
        if(nftId) option.filter.nftId = nftId;
        if(offerIndex) option.filter.offerIndex = offerIndex;

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

class AuctionContractWrapper extends OwnableContractWrapper {
  #listingPrice;
  constructor(contractAddress=defaultContractAddressObj[networkId].auction, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(AUCTION_CONTRACT_ABI);
    this.initInstance(contractAddress);
    this.#setListingPriceFromChain();
  }
  async #setListingPriceFromChain(){
    let _listingPrice = await this.getInstance().methods.listingPrice().call();
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
  async setAuctionOwner(_newOwner, option) {
    let txOptions = {
      from: this.getDefaultFromAccount()
    }
    return this.getInstance().methods.setAuctionOwner(_newOwner).send(txOptions)
        .on('sending', option.sending || _emptyFunc)
        .on('sent', option.sent || _emptyFunc)
        .on('transactionHash', option.transactionHash || _emptyFunc)
        .on('receipt', option.receipt || _emptyFunc)
        .on('error', option.error || _emptyFunc);
  }
  async setListingPrice(_listingPriceWei, option) {
    let txOptions = {
      from: this.getDefaultFromAccount()
    }
    return this.getInstance().methods.setListingPrice(_listingPriceWei).send(txOptions)
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

  /////////////////////////////////////////////
  // Public function
  /////////////////////////////////////////////
  async getAuctionCurrentCount(_nft, _tokenId){
    return this.getInstance().methods.getAuctionCurrentCount(_nft, _tokenId).call();
  }
  async getItemInfoOnAuction(_nft, _tokenId, _count){
    return this.getInstance().methods.getItemInfoOnAuction(_nft, _tokenId, _count).call();
  }
  async getMyAuctionBid(_nft, _tokenId, _count){
    return this.getInstance().methods.getMyAuctionBid(_nft, _tokenId, _count).call();
  }
  async listingPrice(){
    return await this.getInstance().methods.listingPrice().call();
  }

}
 */
class BasicERC721ContractWrapper extends OwnableContractWrapper {
  constructor(contractAddress, walletAddress){
    super(contractAddress, walletAddress)
  }
}
class BasicERC1155ContractWrapper extends OwnableContractWrapper {
  constructor(contractAddress, walletAddress){
    super(contractAddress, walletAddress)
  }
}
class BasicAuctionContractWrapper extends OwnableContractWrapper {
  constructor(contractAddress, walletAddress){
    super(contractAddress, walletAddress)
  }
}
class BasicMarketContractWrapper extends OwnableContractWrapper {
  constructor(contractAddress, walletAddress){
    super(contractAddress, walletAddress)
  }
}

/**
 * contractClassDecorator. Address와 ABI를 통해 클래스의 함수들을 자동으로 추가해준다.
 * @param {*} _targetClass 빈 클래스 넣기
 * @param {*} _address Blockchain에 올라간 contract Address
 * @param {*} _abi Blockchain에 올라간 contract ABI
 * @returns class instance
 */
// 샘플 사용법
// let marketNew_contract = await contractClassDecorator(MarketContractWrapperNew, SEPOLIA_NEW_MARKET_ADDRESS, SEPOLIA_NEW_MARKET_ABI);
const contractClassDecorator = async (_targetClass, _address, _abi) => {
  const functions = _abi.filter(e => e.type == 'function');
  const isViewFunction = (stateMutability) => {
    return stateMutability == 'pure' || stateMutability == 'view'
  }

  functions.forEach(element => {
    const functionName = element.name
    const inputs = element.inputs
    const tempInputs = ['option'];
    const argsArray = [...inputs, ...tempInputs]
    _targetClass.prototype[functionName] = async function (...argsArray) {
      let args = [...arguments];
      let option;
      if(arguments.length-1 == inputs.length){
        // 실제 입력된 매개변수길이가 요구되는 input길이보다 1 많을 경우 마지막 매개변수가 option이라고 간주.
        option = args.splice(args.length-1, 1);
        option = option[0]
      } else if(arguments.length == inputs.length){
        // option이 들어오지 않은 경우. 실제 입력된 매개변수길이가 요구되는 input길이와 같음
        option = getDefaultMethodOptionCallback(functionName, null, null);
      } else {
        // 잘못된 매개변수 길이.
        throw Error(`Error: Invalid number of parameters for "${functionName}". Got ${arguments.length} expected ${inputs.length}!`)
      }
      let txOptions = {
        from: this.getDefaultFromAccount(),
      }
      if(option?.value) txOptions.value = Number(option.value)

      if(isViewFunction(element.stateMutability)){
        if(inputs.length == 0){
          return this.getInstance().methods[functionName]().call();
        } else {
          return this.getInstance().methods[functionName](...args).call();
        }
      } else {
        if(inputs.length == 0){
          return this.getInstance().methods[functionName]().send(txOptions)
              .on('sending', option.sending || _emptyFunc)
              .on('sent', option.sent || _emptyFunc)
              .on('transactionHash', option.transactionHash || _emptyFunc)
              .on('receipt', option.receipt || _emptyFunc)
              .on('error', option.error || _emptyFunc);
        } else {
          return this.getInstance().methods[functionName](...args).send(txOptions)
              .on('sending', option.sending || _emptyFunc)
              .on('sent', option.sent || _emptyFunc)
              .on('transactionHash', option.transactionHash || _emptyFunc)
              .on('receipt', option.receipt || _emptyFunc)
              .on('error', option.error || _emptyFunc);
        }
      }
    }
  });

  let instance = new _targetClass(_address, await getAccount())
  instance.setABI(_abi)
  instance.initInstance()
  return instance;
}
