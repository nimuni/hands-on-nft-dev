// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    // counter
    // for market
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0001 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );


    constructor() ERC721("HandsOn NFT Marketplace", "HNM") {
        owner = payable(msg.sender);
    }

    ///////////////////////////////////////
    // mint NFT function
    ///////////////////////////////////////
    function createToken(string memory _tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        return newTokenId;
    }

    ///////////////////////////////////////
    // payable function
    ///////////////////////////////////////
    function listMarketItem(uint256 _tokenId, uint256 _price) public payable {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "send value must be equal to listing price");

        idToMarketItem[_tokenId] = MarketItem(
            _tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            false
        );

        _transfer(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(
            _tokenId,
            msg.sender,
            address(this),
            _price,
            false
        );
    }
    function relistMarketItem(uint256 _tokenId, uint256 _price) public payable {
      require(idToMarketItem[_tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[_tokenId].sold = false;
      idToMarketItem[_tokenId].price = _price;
      idToMarketItem[_tokenId].seller = payable(msg.sender);
      idToMarketItem[_tokenId].owner = payable(address(this));

      _itemsSold.decrement();

      _transfer(msg.sender, address(this), _tokenId);
    }


    // function listMarketItem2(uint256 _tokenId, uint256 _price) public payable {
    //     require(_price > 0, "Price must be at leat 1 wei");
    //     require(msg.value == listingPrice, "Listing fee must be equal to listing price");



    //     if(idToMarketItem[_tokenId].tokenId == 0){
    //         // 등록된적없는경우
    //         idToMarketItem[_tokenId] = MarketItem(
    //             _tokenId,
    //             payable(msg.sender),
    //             payable(address(this)),
    //             _price,
    //             false
    //         );

    //         _transfer(msg.sender, address(this), _tokenId);

    //         emit MarketItemCreated(
    //             _tokenId,
    //             msg.sender,
    //             address(this),
    //             _price,
    //             false
    //         );
    //     } else {
    //         // 재등록하는 경우
    //         require(idToMarketItem[_tokenId].owner == msg.sender, "Only item owner can perform this operation");


    //         idToMarketItem[_tokenId].sold = false;
    //         idToMarketItem[_tokenId].price = _price;
    //         idToMarketItem[_tokenId].seller = payable(msg.sender);
    //         idToMarketItem[_tokenId].owner = payable(address(this));
    //         _itemsSold.decrement();

    //         _transfer(msg.sender, address(this), _tokenId);
    //     }
    // }

    function buyMarketItem(uint256 _tokenId) public payable {
        uint price = idToMarketItem[_tokenId].price;
        address seller = idToMarketItem[_tokenId].seller;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToMarketItem[_tokenId].owner = payable (msg.sender);
        idToMarketItem[_tokenId].sold = true;
        idToMarketItem[_tokenId].seller = payable (address(0));

        _itemsSold.increment();
        _transfer(address(this), msg.sender, _tokenId);

        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    ///////////////////////////////////////
    // public function
    ///////////////////////////////////////
    function getUnsoldMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for(uint i = 0; i < itemCount; i++){
            if(idToMarketItem[i + 1].owner == address(this)){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getMyPurchasedMarketItems() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    function getMyListedItems() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
            itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
            uint currentId = i + 1;
            MarketItem storage currentItem = idToMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
            }
        }
        return items;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }


}
