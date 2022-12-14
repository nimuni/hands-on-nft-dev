// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

interface IERC721 {
    function transfer(address, uint) external;

    function transferFrom(address, address, uint) external;
}

contract Auction {
    event Start();
    event End(address highestBidder, uint highestBid);
    event Bid(address indexed sender, uint amout);
    event Withdraw(address indexed bidder, uint amout);

    address payable  public seller;
    
    bool public started;
    bool public ended;
    uint public endAt;

    IERC721 public nft;
    uint public nftId;

    uint public highestBid;
    address public highestBidder;
    mapping (address => uint) public bids;

    constructor() {
        seller = payable(msg.sender);
    }

    function start(IERC721 _nft, uint _nftId, uint _startingBid, uint _hours) external {
        require(msg.sender == seller, "you did not start the auction");
        require(!started, "Already started");

        highestBid = _startingBid;

        nft = _nft;
        nftId = _nftId;
        nft.transferFrom(msg.sender, address(this), _nftId);

        started = true;
        endAt = block.timestamp + (_hours * 7 hours);

        emit Start();
    }

    function bid() external  payable {
        require(started, "Auction is not started");
        require(block.timestamp < endAt, "Auction is ended");
        require(msg.value > highestBid, "Bid have to bigger than highest bid");

        if(highestBidder != address(0)){
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(highestBidder, highestBid);
    }

    function withdraw() external payable {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        
        (bool sent, bytes memory data) = payable (msg.sender).call{value: bal}("");
        require(sent, "could not withdraw");

        emit Withdraw(msg.sender, bal);
    }

    function end() external {
        require(started, "You need to start first!");
        require(block.timestamp >= endAt, "Auction is still ongoing");
        require(!ended, "Auction already ended");

        if(highestBidder != address(0)) {
            nft.transfer(highestBidder, nftId);
            (bool sent, bytes memory data) = seller.call{value: highestBid}("");
            require(sent, "could not pay seller");
        } else {
            nft.transfer(seller, nftId);
        }

        ended = true;

        emit End(highestBidder, highestBid);
    }
}