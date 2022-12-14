// SPDX-License-Identifier: MIT
// https://github.com/techwithtim/Solidity-NFT-Auction/blob/main/auction.sol 참고
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AuctionMarket {
    using Counters for Counters.Counter;
    address private marketOwner;

    uint256 LISTING_PRICE = 0.0001 ether;

    struct AuctionStruct {
        address nftAddress;
        uint256 nftId;
        address seller;
        uint256 startAt;
        uint256 endAt;
        bool ended;
        uint256 highestBid;
        address highestBidder;
    }
    struct CostStruct {
        uint creatorAmount;
        uint ownerAmount;
        uint marketAmount;
    }

    struct AuctionWrapper {
        mapping(address => uint256) auctionBid;
        AuctionStruct auctionInfo;
    }
    mapping(uint256 => AuctionWrapper) auctionArray;
    Counters.Counter private _totalAuctionItemCount;

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
    function addAuctionItem(address _nft, uint256 _tokenId, uint256 _durationMinutes, uint256 _startBid) external payable {
        IERC721 nft = IERC721(_nft);
        require(nft.ownerOf(_tokenId) == msg.sender, "Auction opener is not NFT owner. or Check the approvalForAll");
        require(msg.value == LISTING_PRICE, "send value must be equal to listing price");

        nft.transferFrom(msg.sender, address(this), _tokenId);

        uint256 _endAt = block.timestamp + _durationMinutes * 1 minutes;

        AuctionStruct memory auction = AuctionStruct(
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
        AuctionStruct storage auctionInfo = auctionArray[_tokenId].auctionInfo;

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
        AuctionStruct storage auctionInfo = auctionArray[_tokenId].auctionInfo;
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
        payable (marketOwner).transfer(LISTING_PRICE);

        auctionInfo.ended = true;

        // payable (auctionInfo.seller).transfer(auctionInfo.highestBid);
        
        emit AuctionEnded(auctionInfo.highestBidder, auctionInfo.highestBid);
    }

    //////////////////////////////
    // pure function
    //////////////////////////////

    //////////////////////////////
    // view function
    //////////////////////////////
    function getListingPrice() public view returns (uint256) {
        return LISTING_PRICE;
    }
    function getTotalItemCount() public view returns (uint) {
        return _totalAuctionItemCount.current();
    }
    function getTotalItemList() public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        AuctionStruct[] memory auctionItems = new AuctionStruct[](totalAuctionItemCount);
        for(uint i = 0; i < totalAuctionItemCount; i++){
            uint currentId = i + 1;
            AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
            auctionItems[i] = currentItem;
        }
        return auctionItems;
    }
    function getBeforeEndAtItemList() public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint tempAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt > block.timestamp){
                tempAuctionItemCount += 1;
            }
        }

        AuctionStruct[] memory auctionItems = new AuctionStruct[](tempAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt > block.timestamp){
                uint currentId = i + 1;
                AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
                auctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return auctionItems;
    }
    function getAfterEndAtItemList() public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint tempAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt < block.timestamp){
                tempAuctionItemCount += 1;
            }
        }

        AuctionStruct[] memory auctionItems = new AuctionStruct[](tempAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.endAt < block.timestamp){
                uint currentId = i + 1;
                AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
                auctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return auctionItems;
    }
    function getNotEndedItemList() public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint notEndedAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(!auctionArray[i + 1].auctionInfo.ended){
                notEndedAuctionItemCount += 1;
            }
        }

        AuctionStruct[] memory notEndedAuctionItems = new AuctionStruct[](notEndedAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(!auctionArray[i + 1].auctionInfo.ended){
                uint currentId = i + 1;
                AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
                notEndedAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return notEndedAuctionItems;
    }
    function getEndedItemList() public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint endedAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.ended){
                endedAuctionItemCount += 1;
            }
        }

        AuctionStruct[] memory endedAuctionItems = new AuctionStruct[](endedAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.ended){
                uint currentId = i + 1;
                AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
                endedAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return endedAuctionItems;
    }
    function getSellerAuctionItemList(address _seller) public view returns (AuctionStruct[] memory){
        uint totalAuctionItemCount = _totalAuctionItemCount.current();
        uint notEndedAuctionItemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.seller == _seller){
                notEndedAuctionItemCount += 1;
            }
        }

        AuctionStruct[] memory searchedAuctionItems = new AuctionStruct[](notEndedAuctionItemCount);

        for(uint i = 0; i < totalAuctionItemCount; i++){
            if(auctionArray[i + 1].auctionInfo.seller == _seller){
                uint currentId = i + 1;
                AuctionStruct storage currentItem = auctionArray[currentId].auctionInfo;
                searchedAuctionItems[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return searchedAuctionItems;
    }
}