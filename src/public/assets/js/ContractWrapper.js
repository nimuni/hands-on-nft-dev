const NFT_ADDRESS_DEFAULT_3 = "0xBCC141aE0fa4d52F0a07F6AbB989D5f5ACeE4238";
const NFT_CONTRACT_ABI_3 = [
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
const MARKET_ADDRESS_DEFAULT_3 = "0x216e7FaC8E329EccB686b34dD57Ff52a57D7964f";
const MARKET_CONTRACT_ABI_3 = [
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
const AUCTION_ADDRESS_DEFAULT_3 = "0x094936a6ba1972b27758b7cc52c489e9114066e2";
const AUCTION_CONTRACT_ABI_3 = [
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

const _emptyFunc = () => {

}

const getDefaultMethodOption = (label, callback) => {
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
      callback()
    },
    error: (error, receipt)=>{
      console.error("event error")
      console.log(error)
      console.log(receipt)
      alert(`${label} 실패`)
      callback()
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

class NftContractWrapper extends OwnableContractWrapper /* BasicContractWrapper */ {
  constructor(contractAddress=NFT_ADDRESS_DEFAULT_3, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    // this.setABI(this.#abi);
    this.setABI(NFT_CONTRACT_ABI_3);
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

class MarketContractWrapper extends OwnableContractWrapper /* BasicContractWrapper */ {
  #listingPrice;

  constructor(contractAddress=MARKET_ADDRESS_DEFAULT_3, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(MARKET_CONTRACT_ABI_3);
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

class AuctionContractWrapper extends OwnableContractWrapper /* BasicContractWrapper */ {
  #listingPrice;
  constructor(contractAddress=AUCTION_ADDRESS_DEFAULT_3, defaultFromAddress){
    super(contractAddress, defaultFromAddress)

    // init local variable
    this.setABI(AUCTION_CONTRACT_ABI_3);
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
