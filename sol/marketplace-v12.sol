// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./AccessControl-v2.sol";

contract NFTMarketplace is AccessControl {
    string public version = "0.1.12";
    uint256 public marketFee = 5;   // percentage. 5%

    // 수수료 받을 사람
    address private marketOwner;
    mapping (uint => address) public recipient;
    mapping (uint => uint) public fee;
    uint256 public recipientCount;

    // market 정보
    uint256 public marketId;
    mapping (uint => MarketData) public marketDatas;
    // offer 정보 (market에 아이템 하위 리스트)
    mapping (uint => mapping (uint => OfferData)) public offerDatas;    // marketId, offerCount 기반으로 offer정보 저장
    mapping (uint => uint) public offerCount;   // marketId 기반으로 offer여러건이 들어올 수 있으므로 각각 따로 카운팅

    // market, offer struct
    struct MarketData {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 amount;
        uint256 startAt;
        uint256 endAt;
        uint256 price;
        bool sold;
    }
    struct OfferData {
        address offerer;
        uint256 price;
        bool isAccepted;
    }

    // Market Item
    struct MarketItem {
        address nft;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 startAt;
        uint256 endAt;
        uint256 price;
        bool sold;
    }
    struct MarketWrapper {
        mapping(uint256 => MarketItem) marketItem;
        Counters.Counter listedItemCount;
        Counters.Counter sellingItemCount;
    }
    mapping(address => MarketWrapper) private marketItemsOfAddress;
    Counters.Counter private marketsCount;
    address[] private nftContractAddress;
    Counters.Counter private _listedTotalItemCount;

    // Market Item Offers
    // offerItem[ContractAddress].marㅓetItem[tokenId].offerPrice[offerAddress]
    struct OfferDetail {
        address nft;
        uint256 tokenId;
        address offerer;
        uint256 price;
        uint256 remainPrice;
        uint256 endTime;
        bool ended;
    }
    struct OfferList {
        mapping(uint256 => OfferDetail) offerDetail;
        Counters.Counter totalOfferCount;
    }
    struct MarketOfferWrapper {
        mapping(uint256 => OfferList) marketItem;
    }
    mapping(address => MarketOfferWrapper) private offerItem;


    event MarketItemListed(address indexed nft, uint256 indexed tokenId, uint256 price, uint256 startAt, uint256 endAt, uint256 totalListedMarketItemCount);
    event MarketItemSold(address indexed nft, uint256 indexed tokenId, uint256 price);
    event MarketItemListcancel(address indexed nft, uint256 indexed tokenId);
    event OfferItem(address indexed nft, uint256 indexed tokenId, uint256 indexed offerIndex, address offerer, uint256 price, uint256 endTime);
    event OfferAccept(address indexed nft, uint256 indexed tokenId, uint256 indexed offerIndex, uint256 price);

    constructor(){
        marketOwner = msg.sender;
    }

    //////////////////////////////
    // market function
    //////////////////////////////
    function setMarketOwner(address _newOwner) external onlyRole(ADMIN_ROLE) {
        require(msg.sender == address(marketOwner),"You are not market owner");
        require(address(_newOwner) != address(marketOwner),"New Owner are already market owner");

        grantRole(ADMIN_ROLE, marketOwner);
        grantRole(MINTER_ROLE, marketOwner);
        grantRole(MARKET_LISTER_ROLE, marketOwner);
        grantRole(AUCTION_LISTER_ROLE, marketOwner);

        marketOwner = _newOwner;

        revokeRole(ADMIN_ROLE, msg.sender);
        revokeRole(MINTER_ROLE, msg.sender);
        revokeRole(MARKET_LISTER_ROLE, msg.sender);
        revokeRole(AUCTION_LISTER_ROLE, msg.sender);
    }
    function setMarketFee(uint256 _marketFee) external onlyRole(ADMIN_ROLE){
        require(msg.sender == address(marketOwner),"You are not market owner");
        marketFee = _marketFee;
    }

    //////////////////////////////
    // listing function
    //////////////////////////////
    function listingMarketItem(address _nftContractAddress, uint256 _tokenId, uint256 _price, uint256 _startAt, uint256 _endAt) public payable onlyRole(MARKET_LISTER_ROLE){
        require(_price > 0, "Price must be more of 0");
        require(msg.value == marketFee, "send value must be equal to listing price");

        IERC721 nft = IERC721(_nftContractAddress);
        require(msg.sender == nft.ownerOf(_tokenId), "Only NFT owner can perform listing Item operation");
        // require(nft.isApprovedForAll(msg.sender, address(this)), "Market doesn't have approved to NFT");
        require(nft.getApproved(_tokenId) == address(this), "Market doesn't have approved to NFT");


        if(marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId].seller != address(0)){
            // item re-listing
            marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId].sold = false;
            marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId].price = _price;
            marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId].seller = payable(msg.sender);
            marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId].owner = payable(address(this));

            nft.transferFrom(msg.sender, address(this), _tokenId);
        } else {
            // new Item listing
            MarketItem memory item = MarketItem(_nftContractAddress, _tokenId, payable(msg.sender), payable(address(this)), _price, _startAt, _endAt, false);

            if(getMarketItemsCount(_nftContractAddress) == 0){
                marketsCount.increment();
                nftContractAddress.push(_nftContractAddress);
            }
            marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId] = item;
            nft.transferFrom(msg.sender, address(this), _tokenId);
            marketItemsOfAddress[_nftContractAddress].listedItemCount.increment();
            _listedTotalItemCount.increment();
        }
        marketItemsOfAddress[_nftContractAddress].sellingItemCount.increment();

        emit MarketItemListed(_nftContractAddress, _tokenId, _price, _startAt, _endAt, getTotalMarketItemsCount());
    }
    function buyMarketItem(address _nftContractAddress, uint256 _tokenId) public payable {
        MarketItem memory item = marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId];
        uint price = item.price;
        address seller = item.seller;
        uint _marketSellingCount = getMarketSellingItemsCount(_nftContractAddress);

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(_marketSellingCount > 0, "Market selling no item");
        require(item.startAt >= block.timestamp, "Item selling is not started");
        require(item.endAt < block.timestamp, "Item selling is already ended");

        IERC721 nft = IERC721(_nftContractAddress);

        item.owner = payable (msg.sender);
        item.sold = true;
        item.seller = payable (address(0));

        nft.transferFrom(address(this), msg.sender, _tokenId);

        payable (marketOwner).transfer(marketFee);
        payable (seller).transfer(msg.value);

        marketItemsOfAddress[_nftContractAddress].sellingItemCount.decrement();

        emit MarketItemSold(_nftContractAddress, _tokenId, msg.value);
    }
    function cancelListedItem(address _nftContractAddress, uint256 _tokenId) public payable onlyRole(MARKET_LISTER_ROLE) {
        MarketItem storage item = marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId];

        require(msg.sender == item.seller, "List cancel can do by seller");
        require(!item.sold, "Item cancel just can by unsold");

        IERC721 nft = IERC721(_nftContractAddress);

        item.sold = true;
        item.owner = payable (item.seller);
        item.price = 0;

        nft.transferFrom(address(this), item.seller, _tokenId);

        payable (marketOwner).transfer(marketFee);

        marketItemsOfAddress[_nftContractAddress].sellingItemCount.decrement();

        emit MarketItemListcancel(_nftContractAddress, _tokenId);
    }

    //////////////////////////////
    // offer function
    //////////////////////////////
    function offerMarketItem(address _nftContractAddress, uint256 _tokenId, uint256 _endTime) public payable {
        require(msg.value > 0, "Please submit the correct price");
        OfferList storage offerList = offerItem[_nftContractAddress].marketItem[_tokenId];
        offerList.totalOfferCount.increment();
        uint256 tempIndex = offerList.totalOfferCount.current();

        offerList.offerDetail[tempIndex].nft = _nftContractAddress;
        offerList.offerDetail[tempIndex].tokenId = _tokenId;
        offerList.offerDetail[tempIndex].offerer = msg.sender;
        offerList.offerDetail[tempIndex].price = msg.value;
        offerList.offerDetail[tempIndex].remainPrice = msg.value;
        offerList.offerDetail[tempIndex].endTime = _endTime;
        offerList.offerDetail[tempIndex].ended = false;

        emit OfferItem(_nftContractAddress, _tokenId, tempIndex, msg.sender, msg.value, _endTime);
    }
    function acceptOffer(address _nftContractAddress, uint _tokenId, uint256 _offerIndex) public payable {
        OfferDetail storage offer = offerItem[_nftContractAddress].marketItem[_tokenId].offerDetail[_offerIndex];

        require(offer.endTime > block.timestamp, "offer is invalid");
        require(!offer.ended, "Offer is already ended");
        require(offer.remainPrice > 0, "Offer has invalid remainPrice");

        IERC721 nft = IERC721(_nftContractAddress);

        require(nft.getApproved(_tokenId) == address(this), "Market doesn't have approved to NFT");

        uint256 _tempPrice = offer.remainPrice;
        offer.remainPrice = 0;

        address tokenOwner = nft.ownerOf(_tokenId);
        // 수락 이후 전송
        if(_tempPrice > 0) {
            (bool sent, bytes memory data) = tokenOwner.call{value: _tempPrice}("");
            require(sent, "Could not pay seller!");
            nft.transferFrom(address(msg.sender), offer.offerer, _tokenId);

            offer.ended = true;
            offer.endTime = 0;

            emit OfferAccept(_nftContractAddress, _tokenId, _offerIndex, _tempPrice);
        } else {
            offer.remainPrice = _tempPrice;
        }
    }
    function withdrawOutdatedOffer(address _nftContractAddress, uint _tokenId, uint256 _offerIndex) external returns (bool) {
        OfferDetail storage offer = offerItem[_nftContractAddress].marketItem[_tokenId].offerDetail[_offerIndex];

        require(offer.remainPrice > 0, "Offer has no remainPrice");
        require(address(offer.offerer) == address(msg.sender), "you are not the offerer");
        require((offer.endTime < block.timestamp*1000) && !offer.ended, "offer is not ended");

        uint remainPrice = offer.remainPrice;

        if(remainPrice > 0) {
            offer.remainPrice = 0;

            if(!payable (msg.sender).send(remainPrice)){
                offer.remainPrice = remainPrice;
                return false;
            }
        }
        return true;
    }


    //////////////////////////////
    // view function
    //////////////////////////////
    function getMarketsCount() public view returns (uint256){
        return marketsCount.current();
    }
    function getMarkets() public view returns (address[] memory){
        return nftContractAddress;
    }
    function getMarketItemsCount(address _nftContractAddress) public view returns (uint256){
        return marketItemsOfAddress[_nftContractAddress].listedItemCount.current();
    }
    function getMarketSellingItemsCount(address _nftContractAddress) public view returns (uint256){
        return marketItemsOfAddress[_nftContractAddress].sellingItemCount.current();
    }
    function getTotalMarketItemsCount() public view returns (uint256) {
        return _listedTotalItemCount.current();
    }
    function getMarketInfo(address _nftContractAddress, uint _tokenId) public view returns (MarketItem memory){
        MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId];
        return tempItem;
    }
    function getOfferDetail(address _nftContractAddress, uint256 _tokenId, uint256 _offerIndex) public view returns (OfferDetail memory){
        OfferDetail storage offerDetail = offerItem[_nftContractAddress].marketItem[_tokenId].offerDetail[_offerIndex];
        return offerDetail;
    }
    
}
