// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AccessControl-v1.sol";

contract AuctionMarket is AccessControl {
    string public version = "0.1.6";
    uint256 public listingPrice;
    address private auctionOwner;

    using Counters for Counters.Counter;

    mapping (address => AuctionWrapper) private auctionWrapper; // nftAddress
    struct AuctionWrapper { // tokenId
        mapping (uint256 => AuctionItem) auctionItem;
    }
    struct AuctionItem {    // auctionItemCount
        Counters.Counter auctionInfoCounter;
        mapping (uint256 => AuctionInfo) auctionInfo;
        mapping (uint256 => AuctionBidInfo) auctionBidInfo;
    }
    struct AuctionInfo {
        address seller;
        uint256 startAt;
        uint256 endAt;
        bool ended;
        uint256 highestBid;
        address highestBidder;
    }
    struct AuctionBidInfo {
        mapping (address => uint256) bid;
    }

    //////////////////////////////
    // events
    //////////////////////////////
    event AuctionAdded(address indexed nft, uint256 indexed tokenId, uint256 indexed auctionCount, uint256 startAt, uint256 endAt, uint256 startBid);
    event AuctionBided(address indexed nft, uint256 indexed tokenId, uint256 indexed auctionCount, address bidder, uint256 bid);
    event AuctionEnded(address indexed nft, uint256 indexed tokenId, uint256 indexed auctionCount, address highestBidder, uint256 highestBid);

    constructor() {
        auctionOwner = msg.sender;
    }

    //////////////////////////////
    // market function
    //////////////////////////////
    function setAuctionOwner(address _newOwner) external onlyRole(ADMIN_ROLE) {
        require(msg.sender == address(auctionOwner), "You are not auction owner");
        require(address(_newOwner) != address(auctionOwner), "New Owner are already auction owner");
        auctionOwner = _newOwner;
    }
    function setListingPrice(uint256 _listingPriceWei) external onlyRole(ADMIN_ROLE) {
        require(msg.sender == address(auctionOwner), "You are not auction owner");
        listingPrice = _listingPriceWei;
    }

    //////////////////////////////
    // external function
    //////////////////////////////
    function addAuctionItem(address _nft, uint256 _tokenId, uint256 _startAt, uint256 _endAt, uint256 _startBid) external payable onlyRole(AUCTION_LISTER_ROLE) {
        IERC721 nft = IERC721(_nft);
        uint256 currentCount = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter.current();

        require(nft.ownerOf(_tokenId) == msg.sender, "Auction opener is not NFT owner");
        require(nft.getApproved(_tokenId) == address(this), "You have to approve to the Auction market first");
        require(msg.value == listingPrice, "You have to send value, which be equal to listing price");

        AuctionInfo memory tempAuctionInfo = AuctionInfo(
            msg.sender,
            _startAt,
            _endAt,
            false,
            _startBid,
            address(0)
        );

        auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter.increment();
        currentCount = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter.current();
        auctionWrapper[_nft].auctionItem[_tokenId].auctionInfo[currentCount] = tempAuctionInfo;

        nft.transferFrom(msg.sender, address(this), _tokenId);

        emit AuctionAdded(_nft, _tokenId, currentCount, _startAt, _endAt, _startBid);
    }
    function bidAuctionItem(address _nft, uint256 _tokenId) external payable returns (bool) {
        uint256 currentCount = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter.current();
        AuctionInfo storage auctionInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfo[currentCount];
        AuctionBidInfo storage auctionBidInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionBidInfo[currentCount];

        require(auctionInfo.seller != msg.sender, "Auction seller can't bid");
        require(auctionInfo.startAt < block.timestamp, "Auction is not started");
        require(auctionInfo.endAt > block.timestamp, "Auction is ended");
        require(auctionInfo.highestBid < msg.value, "Your bid is smaller than Highest Bid");

        if(auctionBidInfo.bid[msg.sender] > 0){
            uint256 currentBid = auctionBidInfo.bid[msg.sender];
            auctionBidInfo.bid[msg.sender] = 0;
            if(!payable (msg.sender).send(currentBid)){
                auctionBidInfo.bid[msg.sender] = currentBid;
                return false;
            }
        }
        auctionInfo.highestBid = msg.value;
        auctionInfo.highestBidder = msg.sender;

        auctionBidInfo.bid[msg.sender] = msg.value;


        emit AuctionBided(_nft, _tokenId, currentCount, msg.sender, msg.value);

        return true;
    }
    function withdrawFromAuction(address _nft, uint256 _tokenId, uint256 _count) external returns (bool) {
        AuctionInfo storage auctionInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfo[_count];
        AuctionBidInfo storage auctionBidInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionBidInfo[_count];

        require(auctionBidInfo.bid[msg.sender] > 0, "You don't have the bid");
        require(auctionInfo.highestBidder != msg.sender, "Highest Bidder can't do withdraw");

        uint bidAmount = auctionBidInfo.bid[msg.sender];
        auctionBidInfo.bid[msg.sender] = 0;

        if(!payable (msg.sender).send(bidAmount)){
            auctionBidInfo.bid[msg.sender] = bidAmount;
            return false;
        }
        return true;
    }
    function endAuctionItem(address _nft, uint256 _tokenId) external payable {
        uint256 currentCount = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter.current();
        AuctionInfo storage auctionInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfo[currentCount];
        AuctionBidInfo storage auctionBidInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionBidInfo[currentCount];

        // TODO. seller만 끝내는 게 괜찮나?
        require(msg.sender == auctionInfo.seller, "Just Seller can end the auction");
        require(auctionInfo.endAt < block.timestamp, "Auction is not ended");
        require(!auctionInfo.ended, "Auction end already called");

        IERC721 nft = IERC721(_nft);

        if(auctionInfo.highestBidder != address(0)) {
            nft.transferFrom(address(this), auctionInfo.highestBidder, _tokenId);
            (bool sent, bytes memory data) = auctionInfo.seller.call{value: auctionInfo.highestBid}("");
            require(sent, "Could not pay seller!");
            auctionBidInfo.bid[auctionInfo.highestBidder] -= auctionInfo.highestBid;
        } else {
            nft.transferFrom(address(this), auctionInfo.seller, _tokenId);
        }
        payable (auctionOwner).transfer(listingPrice);
        auctionInfo.ended = true;

        emit AuctionEnded(_nft, _tokenId, currentCount, auctionInfo.highestBidder, auctionInfo.highestBid);
    }

    //////////////////////////////
    // view function
    //////////////////////////////
    function getItemInfoOnAuction(address _nft, uint256 _tokenId, uint256 _count) public view returns (AuctionInfo memory) {
        AuctionInfo storage auctionInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfo[_count];

        return auctionInfo;
    }
    function getMyAuctionBid(address _nft, uint256 _tokenId, uint256 _count) public view returns (uint256) {
        AuctionBidInfo storage auctionBidInfo = auctionWrapper[_nft].auctionItem[_tokenId].auctionBidInfo[_count];

        return auctionBidInfo.bid[msg.sender];
    }
    function getAuctionCurrentCount(address _nft, uint256 _tokenId) public view returns (uint256) {
        Counters.Counter storage auctionCount = auctionWrapper[_nft].auctionItem[_tokenId].auctionInfoCounter;
        return auctionCount.current();
    }
}
