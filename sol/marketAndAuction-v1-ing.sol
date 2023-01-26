// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MarketAndAuction {
    using Counters for Counters.Counter;
    
    // Auction Start
    address private marketOwner;

    struct AuctionItem {
        address nftAddress;
        uint256 nftId;
        address seller;
        uint256 startAt;
        uint256 endAt;
        bool ended;
        uint256 highestBid;
        address highestBidder;
    }

    struct AuctionWrapper {
        mapping(address => uint256) auctionBid;
        AuctionItem auctionInfo;
    }
    mapping(uint256 => AuctionWrapper) auctionArray;
    Counters.Counter private _totalAuctionItemCount;
    // Auction End

    // Market start
    Counters.Counter private _listedMarketItemCount;
    uint256 listingPrice = 0.0001 ether;

    struct MarketItem {
        address nft;
        uint256 nftId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }
    struct MarketWrapper {
        mapping(uint256 => MarketItem) marketItem;
        Counters.Counter marketItemCount;
    }
    mapping(address => MarketWrapper) private marketItemsOfAddress;
    Counters.Counter private marketsCount;

    event MarketItemListed(address nft, uint256 nftId, uint256 price, uint256 totalMarketItemCount);


    function listingMarketItem(address _nft, uint256 _nftId, uint256 _price) public payable {
        require(_price > 0, "Price must be more of 0");
        require(msg.value == listingPrice, "send value must be equal to listing price");

        IERC721 nft = IERC721(_nft);
        require(msg.sender == nft.ownerOf(_nftId), "Only NFT owner can perform listing Item operation");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Market doesn't have approved to NFT");


        if(marketItemsOfAddress[_nft].marketItem[_nftId].seller != address(0)){
            // item re-listing 
            marketItemsOfAddress[_nft].marketItem[_nftId].sold = false;
            marketItemsOfAddress[_nft].marketItem[_nftId].price = _price;
            marketItemsOfAddress[_nft].marketItem[_nftId].seller = payable(msg.sender);
            marketItemsOfAddress[_nft].marketItem[_nftId].owner = payable(address(this));

            nft.transferFrom(msg.sender, address(this), _nftId);
        } else {
            // new Item listing
            MarketItem memory item = MarketItem(_nft, _nftId, payable(msg.sender), payable(address(this)), _price, false);

            marketItemsOfAddress[_nft].marketItem[_nftId] = item;
            nft.transferFrom(msg.sender, address(this), _nftId);
            _listedMarketItemCount.increment();
        }
        emit MarketItemListed(_nft, _nftId, _price, _listedMarketItemCount.current());
    }
    function getListingMarketItems(address _nft) public view returns (MarketItem[] memory){
        MarketItem[] memory marketItemArray = new MarketItem[](_listedMarketItemCount.current());

        for(uint i = 0; i < _listedMarketItemCount.current(); i++){
            
        }
        return marketItemArray;
    }
    // Market end

    //////////////////////////////
    // events
    //////////////////////////////
    event AuctionAdded(uint256 tokenId, uint256 endAt, uint256 startBid);
    event AuctionBided(uint256 tokenId, address bidder, uint256 highestBid);
    event AuctionEnded(address highestBidder, uint256 highestBid);

    constructor () {
        marketOwner = msg.sender;
    }

    //////////////////////////////
    // external function
    //////////////////////////////
    function addAuctionItem(address _nft, uint256 _tokenId, uint256 _durationMinutes, uint256 _startBid) external {
        IERC721 nft = IERC721(_nft);
        require(nft.ownerOf(_tokenId) == msg.sender, "Auction opener is not NFT owner. or Check the approvalForAll");

        nft.transferFrom(msg.sender, address(this), _tokenId);

        uint256 _endAt = block.timestamp + _durationMinutes * 1 minutes;

        AuctionItem memory auction = AuctionItem(
            _nft,
            _tokenId,
            msg.sender,
            block.timestamp,
            _endAt,
            false,
            _startBid,
            address(0)
        );

        auctionArray[_tokenId].auctionInfo = auction;

        _totalAuctionItemCount.increment();

        emit AuctionAdded(_tokenId, auction.endAt, auction.highestBid);
    }
    function bidAuctionItem(uint256 _tokenId) external payable {
        AuctionItem storage auctionInfo = auctionArray[_tokenId].auctionInfo;

        require(block.timestamp < auctionInfo.endAt, "Auction Already ended");
        require(msg.value > auctionInfo.highestBid, "Bid not Hight Enough");
        require(msg.sender != auctionInfo.highestBidder, "You are already HighestBidder");

        if(auctionInfo.highestBid != 0) {
            auctionArray[_tokenId].auctionBid[auctionInfo.highestBidder] +=  auctionInfo.highestBid;
        }

        auctionInfo.highestBidder = msg.sender;
        auctionInfo.highestBid = msg.value;

        emit AuctionBided(_tokenId, msg.sender, msg.value);
    } 
    function withdrawFromAuction(uint _tokenId) external returns (bool) {
        AuctionWrapper storage auction = auctionArray[_tokenId];
        uint amount = auction.auctionBid[msg.sender];
        if(amount > 0 && auction.auctionInfo.highestBidder != msg.sender) {
            auction.auctionBid[msg.sender] = 0;

            if(!payable (msg.sender).send(amount)){
                auction.auctionBid[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }
    function endAuctionItem(uint256 _tokenId) external payable {
        AuctionItem storage auctionInfo = auctionArray[_tokenId].auctionInfo;
        require(auctionInfo.endAt < block.timestamp, "Auction not yet ended");
        require(!auctionInfo.ended, "Auction end already called");

        IERC721 nft = IERC721(auctionInfo.nftAddress);


        if(auctionInfo.highestBidder != address(0)) {
            nft.transferFrom(address(this), auctionInfo.highestBidder, auctionInfo.nftId);
            (bool sent, bytes memory data) = auctionInfo.seller.call{value: auctionInfo.highestBid}("");
            require(sent, "Could not pay seller!");
        } else {
            nft.transferFrom(address(this), auctionInfo.seller, auctionInfo.nftId);
        }

        auctionInfo.ended = true;

        emit AuctionEnded(auctionInfo.highestBidder, auctionInfo.highestBid);

        payable(auctionInfo.seller).transfer(auctionInfo.highestBid);
    }

    //////////////////////////////
    // pure function
    //////////////////////////////

    //////////////////////////////
    // view function
    //////////////////////////////
    function getTotalItemCount() public view returns (uint) {
        return _totalAuctionItemCount.current();
    }
    function getTotalItemList() public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        AuctionItem[] memory auctionItems = new AuctionItem[](totalAuctionItemCount);
        for(uint i = 0; i < totalAuctionItemCount; i++){
            uint currentId = i + 1;
            AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
            auctionItems[i] = currentItem;
        }
        return auctionItems;
    }
    function getBeforeEndAtItemList() public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint tempAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt > block.timestamp){
                tempAuctionItemCount += 1;
            }
        }

        AuctionItem[] memory auctionItems = new AuctionItem[](tempAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt > block.timestamp){
                uint currentId = i + 1;
                AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
                auctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return auctionItems;
    }
    function getAfterEndAtItemList() public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint tempAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt < block.timestamp){
                tempAuctionItemCount += 1;
            }
        }

        AuctionItem[] memory auctionItems = new AuctionItem[](tempAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt < block.timestamp){
                uint currentId = i + 1;
                AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
                auctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return auctionItems;
    }
    function getNotEndedItemList() public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint notEndedAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(!auctionArray[i + 1].auctionInfo.ended){
                notEndedAuctionItemCount += 1;
            }
        }

        AuctionItem[] memory notEndedAuctionItems = new AuctionItem[](notEndedAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(!auctionArray[i + 1].auctionInfo.ended){
                uint currentId = i + 1;
                AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
                notEndedAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return notEndedAuctionItems;
    }
    function getEndedItemList() public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint endedAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.ended){
                endedAuctionItemCount += 1;
            }
        }

        AuctionItem[] memory endedAuctionItems = new AuctionItem[](endedAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.ended){
                uint currentId = i + 1;
                AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
                endedAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return endedAuctionItems;
    }
    function getSellerAuctionItemList(address _seller) public view returns (AuctionItem[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint sellerAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.seller == _seller){
                sellerAuctionItemCount += 1;
            }
        }

        AuctionItem[] memory sellerAuctionItems = new AuctionItem[](sellerAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.seller == _seller){
                uint currentId = i + 1;
                AuctionItem storage currentItem = auctionArray[currentId].auctionInfo;
                sellerAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return sellerAuctionItems;
    }
}