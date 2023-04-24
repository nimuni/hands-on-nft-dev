// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "./AccessControl-v2.sol";

contract HandsOnNFT_Market is AccessControl, IERC721Receiver, IERC1155Receiver {
    // 거래 수수료 받는 사람
    address private marketOwner;
    uint256 public marketFee = 5;  // total fee 퍼센트 (총 거래금액의 N%)
    mapping (uint => address) public recipient; // market 운영자 list
    mapping (uint => uint) public fee;          // market 운영자 별 fee 나눠가질 비율 (총합 100)
    uint256 public recipientCount;

    // market 정보
    uint256 public marketDataId;
    mapping (uint => MarketData) public marketDatas;
    // offer 정보 (market에 아이템 하위 리스트)
    mapping (address => uint) public escrowAmount;
    mapping (uint => mapping (uint => OfferData)) public offerDatas;    // marketDataId 하부 offerCount 기반으로 offer정보 저장
    mapping (uint => uint) public offerCount;   // marketDataId 기반으로 offer여러건이 들어올 수 있으므로 각각 따로 카운팅

    // market, offer struct
    struct MarketData {
        address seller;
        address token;
        uint256 tokenId;
        uint256 tokenERCType;
        uint256 remainAmountToken;
        uint256 totalAmountToken;
        uint256 pricePerPiece;
        uint256 startAt;
        uint256 endAt;
        bool sold;
    }
    struct OfferData {
        address offerer;
        uint256 pricePerPiece;
        uint256 amountOfToken;
        bool isAccepted;
    }

    event MarketAdded(uint256 indexed marketDataId, address indexed token, uint256 indexed tokenId, uint256 tokenERCType, uint256 remainAmountToken, uint256 totalAmountToken, uint256 _pricePerPiece, uint256 _startAt, uint256 _endAt);
    event MarketCancel(uint256 indexed marketDataId, address indexed token, uint256 indexed tokenId, uint256 tokenERCType, uint256 remainAmountToken, uint256 totalAmountToken);
    event MarketSold(uint256 indexed marketDataId, address indexed token, uint256 indexed tokenId, uint256 tokenERCType, uint256 amountOfToken, uint256 remainAmountToken, uint256 totalAmountToken, uint256 _pricePerPiece);
    event OfferItem(uint256 indexed marketDataId, uint256 indexed offerCount, address indexed offerer, uint256 _pricePerPiece, uint256 amountOfToken);
    event OfferAccept(uint256 indexed marketDataId, uint256 indexed offerCount, address offerer, uint256 _pricePerPiece, uint256 amountOfToken);

    constructor(){
        marketOwner = msg.sender;
    }

    //////////////////////////////
    // admin function
    //////////////////////////////
    function setMarketOwner(address _newOwner) external onlyRole(ADMIN_ROLE) {
        require(address(_newOwner) != address(marketOwner),"New Owner are already market owner");

        marketOwner = _newOwner;
        grantRole(ADMIN_ROLE, marketOwner);
        grantRole(MARKET_LISTER_ROLE, marketOwner);
        revokeRole(ADMIN_ROLE, msg.sender);
        revokeRole(MARKET_LISTER_ROLE, msg.sender);
    }
    function setMarketFee(uint256 _marketFee) external onlyRole(ADMIN_ROLE){
        marketFee = _marketFee;
    }
    function updateFeeAndRecipient( address[] memory _recipient,  uint256[] memory _fee ) external onlyRole(ADMIN_ROLE) {
        require(_recipient.length == _fee.length, "Not match");
        
        // market fee를 수령하는 사람 수
        recipientCount = _fee.length;

        // market 운영자 목록, fee비율 업데이트
        for (uint i = 0; i < recipientCount; i++) {
            recipient[i] = _recipient[i];
            fee[i] = _fee[i];
        }
    }

    // ERC721, ERC1155 토큰을 판매에 리스팅할 때에, market Contract가 소유해야 하기 때문에 구현한 Received 함수
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
    function transfer(address _receiver, address _token, uint256 _tokenId, uint256 _remainAmountToken ) external returns (bool) {
        IERC1155(_token).safeTransferFrom( msg.sender,  _receiver,  _tokenId,  _remainAmountToken,  "0x0" );
        return true;
    }

    //////////////////////////////
    // market function
    //////////////////////////////
    function createMarketData(address _token, uint256 _tokenId, uint256 _tokenERCType, uint256 _totalAmountToken, uint256 _pricePerPiece, uint256 _startAt, uint256 _endAt) external onlyRole(MARKET_LISTER_ROLE) returns (bool) {
        require(_totalAmountToken > 0, "The amount of tokens to sell, needs to be greater than 0");
        require(_pricePerPiece > 0, "The price per piece need to be greater than 0");
        //정책 정하고서 진행필요. require(_startAt > block.timestamp, "The start date should be after now");
        require(_tokenERCType == 721 || _tokenERCType == 1155, "Not supported token type");

        // market Contract가 판매 진행할 토큰을 수령 후 판매 진행.
        if(_tokenERCType == 721) {
            require(_totalAmountToken == 1, "ERC721 remainAmountToken must be 1");
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
                _totalAmountToken, 
                "0x0"
            );
        }

        // 마켓데이터 생성
        marketDatas[marketDataId] = MarketData (
            msg.sender,
            _token,
            _tokenId,
            _tokenERCType,
            _totalAmountToken,
            _totalAmountToken,
            _pricePerPiece, 
            _startAt,
            _endAt,
            false
        );

        emit MarketAdded(marketDataId, _token, _tokenId, _tokenERCType, _totalAmountToken, _totalAmountToken, _pricePerPiece, _startAt, _endAt);
        
        marketDataId ++;

        return true;
    }
    function buyMarketToken(uint256 _marketDataId, uint _amountOfToken) external payable returns (bool) {
        MarketData memory marketData = marketDatas[_marketDataId];

        require(marketData.sold != true, "The token was sold.");
        require(msg.value == marketData.pricePerPiece * _amountOfToken, "Needs to be equal to the price.");
        require(msg.sender != marketData.seller, "seller can't buy token");
        require(marketData.endAt > block.timestamp, "It is Ended");
        require(block.timestamp >= marketData.startAt, "Buy token should be called after the startAt");
        require(marketData.remainAmountToken >= _amountOfToken, "amountOfToken Needs to be smaller or equal to the remainAmountToken");

        // 갯수조정
        marketDatas[_marketDataId].remainAmountToken -= _amountOfToken;

        // token 전송
        if(marketData.tokenERCType == 721) {
            IERC721(marketData.token).safeTransferFrom(
                address(this), 
                msg.sender, 
                marketData.tokenId
            );
        } else {
            IERC1155(marketData.token).safeTransferFrom(
                address(this), 
                msg.sender, 
                marketData.tokenId, 
                _amountOfToken, 
                "0x0"
            );
        }

        // 가격, fee 계산 및 분배
        uint256 salePrice = marketData.pricePerPiece * _amountOfToken;
        uint256 feePrice = salePrice * marketFee / 100;
        payable(marketData.seller).transfer(salePrice - feePrice);
        if(recipientCount == 0){
            payable(marketOwner).transfer(feePrice);
        } else {
            for (uint i = 0; i < recipientCount;  i++) {
                payable(recipient[i]).transfer(feePrice * fee[i] / 100);
            }
        }

        // 남은 갯수 별 처리
        if(marketDatas[_marketDataId].remainAmountToken > 0){
            emit MarketSold(_marketDataId, marketData.token, marketData.tokenId, marketData.tokenERCType, _amountOfToken, marketData.remainAmountToken, marketData.totalAmountToken, marketData.pricePerPiece);
        } else {
            // 판매완료 or Offer수락 완료된 Item 대상으로 offer 돌려주기.
            marketDatas[_marketDataId].sold = true;
            returnExpiredOffer(_marketDataId);

            emit MarketSold(_marketDataId, marketData.token, marketData.tokenId, marketData.tokenERCType, _amountOfToken, marketData.remainAmountToken, marketData.totalAmountToken, marketData.pricePerPiece);
        }

        return true;
    }
    function cancelMarketData(uint256 _marketDataId) external payable returns (bool) {
        MarketData memory marketData = marketDatas[_marketDataId];

        require(marketDatas[_marketDataId].seller == msg.sender, "should be the owner of the sell.");
        require(marketDatas[_marketDataId].sold != true, "The token was sold.");
        
        if(marketData.tokenERCType == 721) {
            IERC721(marketData.token).safeTransferFrom(
                address(this), 
                marketData.seller, 
                marketData.tokenId
            );
        } else {
            IERC1155(marketData.token).safeTransferFrom(
                address(this), 
                marketData.seller, 
                marketData.tokenId, 
                marketData.remainAmountToken, 
                "0x0"
            );
        }

        emit MarketCancel(_marketDataId, marketData.token, marketData.tokenId, marketData.tokenERCType, marketData.remainAmountToken, marketData.totalAmountToken);

        marketDatas[_marketDataId].sold = true;
        // 판매완료 or Offer수락 완료된 Item 대상으로 offer 돌려주기.
        returnExpiredOffer(_marketDataId);

        if(marketData.remainAmountToken == marketData.totalAmountToken){
            delete marketDatas[_marketDataId];
        }

        return true;
    }
    //////////////////////////////
    // offer function
    //////////////////////////////
    function makeOffer(uint256 _marketDataId, uint256 _amountOfToken) external payable returns (bool) {
        MarketData memory marketData = marketDatas[_marketDataId];
        require(msg.value > 0, "offer send offer value is 0");
        require(marketData.seller != address(0), "No market Data");
        require(marketData.seller != msg.sender, "seller shouldn't offer");
        require(marketData.sold != true, "already sold.");
        require(_amountOfToken > 0, "Needs to be bigger than 0");
        require(marketData.remainAmountToken >= _amountOfToken, "amountOfToken have to smaller than remainAmountToken");

        uint256 counter = offerCount[_marketDataId];

        uint256 _pricePerPiece = msg.value / _amountOfToken;

        offerDatas[_marketDataId][counter] = OfferData(
            msg.sender,
            _pricePerPiece,
            _amountOfToken,
            false
        );

        offerCount[_marketDataId]++;

        escrowAmount[msg.sender] += msg.value;

        emit OfferItem(_marketDataId, counter, msg.sender, _pricePerPiece, _amountOfToken);

        return true;
    }
    function acceptOffer(uint256 _marketDataId, uint256 _offerCount) external returns (bool) {
        OfferData memory offer = offerDatas[_marketDataId][_offerCount];
        MarketData memory marketData = marketDatas[_marketDataId];

        require(marketData.sold != true, "already sold.");
        require(marketData.seller == msg.sender, "not seller");
        require(offer.isAccepted == false, "already accepted");
        require(offer.pricePerPiece * offer.amountOfToken <= escrowAmount[offer.offerer], "lower amount");
        require(marketData.remainAmountToken >= offer.amountOfToken, "Needs to be smaller or equal to the offer amountOfToken");

        // 갯수조정
        marketDatas[_marketDataId].remainAmountToken -= offer.amountOfToken;

        // token 전송
        if(marketData.tokenERCType == 721) {
            IERC721(marketData.token).safeTransferFrom(
                address(this), 
                offer.offerer, 
                marketData.tokenId
            );
        } else {
            IERC1155(marketData.token).safeTransferFrom(
                address(this), 
                offer.offerer, 
                marketData.tokenId, 
                offer.amountOfToken, 
                "0x0"
            );
        }

        // 가격, fee 계산 및 분배
        uint256 offerPrice = offer.pricePerPiece * offer.amountOfToken;
        uint256 feePrice = offerPrice * marketFee / 100;

        escrowAmount[offer.offerer] -= offerPrice;

        payable(marketDatas[_marketDataId].seller).transfer(offerPrice - feePrice);

        if(recipientCount == 0){
            payable(marketOwner).transfer(feePrice);
        } else {
            for (uint i = 0; i < recipientCount;  i++) {
                payable(recipient[i]).transfer(feePrice * fee[i] / 100);
            }
        }

        // 판매완료시 판매완료 처리 후 offer 수락여부 완료 체크
        if(marketDatas[_marketDataId].remainAmountToken == 0){
            marketDatas[_marketDataId].sold = true;

            // 판매완료 or Offer수락 완료된 Item 대상으로 offer 돌려주기.
            returnExpiredOffer(_marketDataId);
        }
        offerDatas[_marketDataId][_offerCount].isAccepted = true;

        emit OfferAccept(_marketDataId, _offerCount, offer.offerer, offer.pricePerPiece, offer.amountOfToken);

        return true;
    }

    function cancelOffer(uint256 _marketDataId, uint256 _offerCount) external returns (bool) {
        OfferData memory offer = offerDatas[_marketDataId][_offerCount];

        require(msg.sender == offer.offerer, "not offerAddress");
        require(offer.isAccepted == false, "already accepted");
        require(offer.pricePerPiece * offer.amountOfToken <= escrowAmount[msg.sender], "lower amount");

        payable(offer.offerer).transfer(offer.pricePerPiece * offer.amountOfToken);
        escrowAmount[msg.sender] -= offer.pricePerPiece * offer.amountOfToken;

        delete offerDatas[_marketDataId][_offerCount];

        return true;
    }

    function returnExpiredOffer(uint256 _marketDataId) internal returns (bool) {
        require(marketDatas[_marketDataId].sold == true, "market item is not solded");

        uint256 counter = offerCount[_marketDataId];

        for (uint i = 0; i < counter; i++) {
            if(!offerDatas[_marketDataId][i].isAccepted){
                uint256 totalPrice = offerDatas[_marketDataId][i].pricePerPiece * offerDatas[_marketDataId][i].amountOfToken;
                offerDatas[_marketDataId][i].pricePerPiece = 0;
                offerDatas[_marketDataId][i].amountOfToken = 0;
                payable(offerDatas[_marketDataId][i].offerer).transfer(totalPrice); 

                delete offerDatas[_marketDataId][i];
            }
        }
        return true;
    }
}