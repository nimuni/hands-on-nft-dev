// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "./AccessControl-v2.sol";

contract HandsOnNFT_Auction is AccessControl, IERC721Receiver, IERC1155Receiver {
    // 거래 수수료 받는 사람
    address private auctionOwner;
    uint256 public auctionFee = 5;  // total fee 퍼센트 (총 거래금액의 N%)
    mapping (uint => address) public recipient; // auction 운영자 list
    mapping (uint => uint) public fee;          // auction 운영자 별 fee 나눠가질 비율 (총합 100)
    uint256 public recipientCount;

    // auction 정보
    struct AuctionData {
        address seller;
        address token;
        uint256 tokenId;
        uint256 tokenERCType;
        uint256 amountOfToken;
        address highestBidder;
        uint256 highestBid;
        uint256 startPrice;
        uint256 minIncrement;
        uint256 startAt;
        uint256 endAt;
    }
    uint256 public auctionDataId;   // 초기값 0
    mapping (uint => AuctionData) public auctionDatas;

    event AuctionAdded(uint256 indexed auctionDataId, address indexed token, uint256 indexed tokenId, uint256 tokenERCType, uint256 amountOfToken, uint256 startPrice, uint256 startAt, uint256 endAt);
    event AuctionBided(uint256 indexed auctionDataId, address highestBidder, uint256 highestBid);
    event AuctionEnded(uint256 indexed auctionDataId, address indexed token, uint256 indexed tokenId, uint256 tokenERCType, uint256 amountOfToken, address highestBidder, uint256 highestBid);

    constructor(){
        auctionOwner = msg.sender;
    }

    //////////////////////////////
    // admin function
    //////////////////////////////
    function setAuctionOwner(address _newOwner) external onlyRole(ADMIN_ROLE) {
        require(address(_newOwner) != address(auctionOwner), "New Owner are already auction owner");
        
        auctionOwner = _newOwner;
        grantRole(ADMIN_ROLE, auctionOwner);
        grantRole(AUCTION_LISTER_ROLE, auctionOwner);
        revokeRole(ADMIN_ROLE, msg.sender);
        revokeRole(AUCTION_LISTER_ROLE, msg.sender);
    }
    function setAuctionFee(uint256 _auctionFee) external onlyRole(ADMIN_ROLE) {
        auctionFee = _auctionFee;
    }
    function updateFeeAndRecipient( address[] memory _recipient,  uint256[] memory _fee ) external onlyRole(ADMIN_ROLE) {
        require(_recipient.length == _fee.length, "Not match");
        
        // auction fee를 수령하는 사람 수
        recipientCount = _fee.length;

        // auction 운영자 목록, fee비율 업데이트
        for (uint i = 0; i < recipientCount; i++) {
            recipient[i] = _recipient[i];
            fee[i] = _fee[i];
        }
    }

    // ERC721, ERC1155 토큰을 경매에 리스팅할 때에, Auction Contract가 소유해야 하기 때문에 구현한 Received 함수
    function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
    function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }
    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }
    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == type(IERC721Receiver).interfaceId || interfaceId == type(IERC1155Receiver).interfaceId;
    }

    //////////////////////////////
    // basic function
    //////////////////////////////
    function getTime() public view returns (uint256) {
        return block.timestamp;
    }
    // Basic transfer function. ERC1155는 아직 Metamask에서 전송 지원이 안되므로 구현
    function transfer( address _receiver, address _token, uint256 _tokenId, uint256 _amountOfToken ) external returns (bool) {
        IERC1155(_token).safeTransferFrom( msg.sender,  _receiver,  _tokenId,  _amountOfToken,  "0x0" );
        return true;
    }

    

    //////////////////////////////
    // auction function
    //////////////////////////////
    function createAuctionSales( address _token, uint256 _tokenId, uint256 _tokenERCType, uint256 _amountOfToken, uint256 _startPrice, uint256 _minIncrement, uint256 _startAt, uint256 _endAt ) external onlyRole(AUCTION_LISTER_ROLE) returns (bool) {
        require(_amountOfToken > 0, "The amount of tokens to sell, needs to be greater than 0");
        require(_startPrice > 0, "The startPrice for the tokens need to be greater than 0");
        //테스트환경이라 주석처리 require(_endAt - _startAt > 86400, "The endAt should to be greater than 1 day from startAt");
        require(_startPrice > 0, "The start Price should be bigger than 0");
        require(_minIncrement > 0, "The minIncrement should be bigger than 0");
        //정책 정하고서 진행필요. require(_startAt > block.timestamp, "The start date should be after now");
        require(_tokenERCType == 721 || _tokenERCType == 1155, "Not supported token type");

        // Auction Contract가 경매 진행할 토큰을 수령 후 경매 진행. (받지않고 경매하면 경매낙찰 시 원 소유주가 빼돌린 이후일 경우가 존재할 수 있음)
        if(_tokenERCType == 721) {
            require(_amountOfToken == 1, "ERC721 amountOfToken must be 1");
            IERC721(_token).safeTransferFrom(
                msg.sender, 
                address(this), 
                _tokenId
            );
        } else {
            IERC1155(_token).safeTransferFrom(
                msg.sender, 
                address(this), 
                _tokenId, 
                _amountOfToken, 
                "0x0"
            );
        }

        // 경매데이터 생성
        auctionDatas[auctionDataId] = AuctionData (
            msg.sender,
            _token,
            _tokenId,
            _tokenERCType,
            _amountOfToken,
            address(0),
            _startPrice - _minIncrement,
            _startPrice,
            _minIncrement,
            _startAt,
            _endAt
        );

        emit AuctionAdded(auctionDataId, _token, _tokenId, _tokenERCType, _amountOfToken, _startPrice, _startAt, _endAt);
        
        auctionDataId ++;

        return true;
    }

    function placeBid( uint256 _auctionDataId ) external payable returns (bool) {
        AuctionData memory auctionData = auctionDatas[_auctionDataId];

        require(msg.value >= auctionData.highestBid + auctionData.minIncrement, "Bid amount should be bigger than highestBid");
        require(msg.sender != auctionData.seller, "seller can't bid");
        require(block.timestamp >= auctionData.startAt, "Bid should be after the startAt");
        require(auctionData.endAt > block.timestamp, "It is Ended");

        if (auctionData.highestBidder != address(0)) {
            payable(auctionData.highestBidder).transfer(auctionData.highestBid);
        }

        auctionDatas[_auctionDataId].highestBidder = msg.sender;
        auctionDatas[_auctionDataId].highestBid = msg.value;

        emit AuctionBided(_auctionDataId, auctionDatas[_auctionDataId].highestBidder, auctionDatas[_auctionDataId].highestBid);

        return true;
    }

    // 경매에 아무도 참여하지 않았을 경우. 취소가능
    function cancelAuction( uint256 _auctionDataId ) external returns (bool) {
        AuctionData memory auctionData = auctionDatas[_auctionDataId];

        require(msg.sender == auctionData.seller, "Only auction seller can cancel it");
        require(block.timestamp > auctionData.endAt, "The time should be after endDate");
        require(auctionData.highestBidder == address(0), "There should be not highestBidder");

        if(auctionData.tokenERCType == 721) {
            IERC721(auctionData.token).safeTransferFrom(
                address(this),
                auctionData.seller, 
                auctionData.tokenId
            );
        } else {
            IERC1155(auctionData.token).safeTransferFrom(
                address(this),
                auctionData.seller, 
                auctionData.tokenId, 
                auctionData.amountOfToken, 
                "0x0"
            );
        }

        delete auctionDatas[_auctionDataId];

        return true;
    }

    // 경매 낙찰자가 물품수령
    function claimAuction( uint256 _auctionDataId ) external returns (bool) {
        AuctionData memory auctionData = auctionDatas[_auctionDataId];

        require(msg.sender == auctionData.highestBidder, "The msg.sender should be the highest Bidder");
        require(block.timestamp > auctionData.endAt, "The time should be after endDate");
        
        if(auctionData.tokenERCType == 721) {
            IERC721(auctionData.token).safeTransferFrom(
                address(this), 
                auctionData.highestBidder, 
                auctionData.tokenId
            );
        } else {
            IERC1155(auctionData.token).safeTransferFrom(
                address(this), 
                auctionData.highestBidder, 
                auctionData.tokenId, 
                auctionData.amountOfToken, 
                "0x0"
            );
        }

        uint256 bidPrice = auctionData.highestBid;
        uint256 feePrice = bidPrice * auctionFee / 100;

        payable(auctionData.seller).transfer(bidPrice - feePrice);

        if(recipientCount == 0){
            payable(auctionOwner).transfer(feePrice);
        } else {
            for (uint i = 0; i < recipientCount;  i++) {
                payable(recipient[i]).transfer(feePrice * fee[i] / 100);
            }
        }

        emit AuctionEnded(_auctionDataId, auctionData.token, auctionData.tokenId, auctionData.tokenERCType, auctionData.amountOfToken, auctionData.highestBidder, auctionData.highestBid);

        return true;
    }
}