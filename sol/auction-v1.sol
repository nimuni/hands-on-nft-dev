// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Auction_v1 {
    event AuctionStart();
    event AuctionBid(address indexed sender, uint amount);
    event AuctionWithdraw(address indexed bidder, uint amount);
    event AuctionEnd(address winner, uint amount);

    IERC721 public nft;
    uint public tokenId;

    address payable public seller;
    uint public endAt;
    bool public started;
    bool public ended;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) public bids;

    constructor(address _nft, uint _tokenId, uint _startingBid) {
        // 해당 NFT계약의 인터페이스를 맵핑하여 호출가능하게 선언
        nft = IERC721(_nft);
        tokenId = _tokenId;

        // 옥션 생성자 저장
        seller = payable (msg.sender);
        // 입찰 시작가격 설정
        highestBid = _startingBid;
    }

    function auctionStart(uint _hours) external {
        require(!started, "auction is already started");
        require(msg.sender == seller, "auctionStart can only be called by the seller");

        // auction 컨트랙트에 NFT 전송해두기
        nft.transferFrom(msg.sender, address(this), tokenId);
        started = true;
        endAt = block.timestamp + (_hours * 1 hours);

        emit AuctionStart();
    }

    function auctionBid() external payable {
        require(started, "auction is not started");
        require(block.timestamp < endAt, "auction is already ended");
        require(msg.value > highestBid, "bid in lower than highest bid");

        if(highestBidder != address(0)){
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        emit AuctionBid(msg.sender, msg.value);
    }

    function auctionWithdraw() external {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit AuctionWithdraw(msg.sender, bal);
    }

    function auctionEnd() external {
        require(started, "auction is not started");
        require(block.timestamp >= endAt, "auction is not ended");
        require(!ended, "auction is already ended");

        ended = true;
        if(highestBidder != address(0)){
            // 입찰자가 있는 경우 최고 입찰자에게 전송
            nft.safeTransferFrom(address(this), highestBidder, tokenId);
            seller.transfer(highestBid);
        } else {
            // 입찰자가 없으면
            nft.safeTransferFrom(address(this), seller, tokenId);
        }

        emit AuctionEnd(highestBidder, highestBid);
    }
}