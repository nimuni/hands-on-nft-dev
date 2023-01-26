// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace {
    using Counters for Counters.Counter;
    string version = "0.1.8";
    uint256 listingPrice;

    // Auction Start
    address private marketOwner;

    // Market Item
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
        Counters.Counter listedItemCount;
        Counters.Counter sellingItemCount;
    }
    mapping(address => MarketWrapper) private marketItemsOfAddress;
    Counters.Counter private marketsCount;
    address[] private nftContractAddress;
    Counters.Counter private _listedTotalItemCount;

    // Market Item Offers
    // marketItemOffer[ContractAddress].marketItem[nftId].offerPrice[offerAddress]
    struct OfferDetail {
        address nft;
        uint256 nftId; 
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
    mapping(address => MarketOfferWrapper) private marketItemOffer;
    

    event MarketItemListed(address nft, uint256 nftId, uint256 price, uint256 totalListedMarketItemCount);
    event MarketItemSold(address nft, uint256 nftId, uint256 price);
    event MarketItemListcancel(address nft, uint256 nftId);
    event MarketItemOffer(address nft, uint256 nftId, uint256 index, uint256 price, uint256 endTime);
    event OfferAccept(address nft, uint256 nftId, uint256 price, address offerer);

    constructor(){
        marketOwner = msg.sender;
        listingPrice = 0.0001 ether;
    }

    //////////////////////////////
    // market function
    //////////////////////////////
    function setMarketOwner(address _newOwner) external  {
        require(msg.sender == address(marketOwner),"You are not market owner");
        require(address(_newOwner) != address(marketOwner),"New Owner are already market owner");
        marketOwner = _newOwner;
    }
    function setListingPrice(uint256 _listingPriceWei) external {
        require(msg.sender == address(marketOwner),"You are not market owner");
        listingPrice = _listingPriceWei;
    }

    //////////////////////////////
    // function
    //////////////////////////////
    function listingMarketItem(address _nftContractAddress, uint256 _nftId, uint256 _price) public payable {
        require(_price > 0, "Price must be more of 0");
        require(msg.value == listingPrice, "send value must be equal to listing price");

        IERC721 nft = IERC721(_nftContractAddress);
        require(msg.sender == nft.ownerOf(_nftId), "Only NFT owner can perform listing Item operation");
        // require(nft.isApprovedForAll(msg.sender, address(this)), "Market doesn't have approved to NFT");
        require(nft.getApproved(_nftId) == address(this), "Market doesn't have approved to NFT");


        if(marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].seller != address(0)){
            // item re-listing 
            marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].sold = false;
            marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].price = _price;
            marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].seller = payable(msg.sender);
            marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].owner = payable(address(this));

            nft.transferFrom(msg.sender, address(this), _nftId);
        } else {
            // new Item listing
            MarketItem memory item = MarketItem(_nftContractAddress, _nftId, payable(msg.sender), payable(address(this)), _price, false);

            if(getMarketItemsCount(_nftContractAddress) == 0){
                marketsCount.increment();
                nftContractAddress.push(_nftContractAddress);
            }
            marketItemsOfAddress[_nftContractAddress].marketItem[_nftId] = item;
            nft.transferFrom(msg.sender, address(this), _nftId);
            marketItemsOfAddress[_nftContractAddress].listedItemCount.increment();
            _listedTotalItemCount.increment();
        }
        marketItemsOfAddress[_nftContractAddress].sellingItemCount.increment();
        
        emit MarketItemListed(_nftContractAddress, _nftId, _price, getTotalMarketItemsCount());
    }
    function buyMarketItem(address _nftContractAddress, uint256 _nftId) public payable {
        uint price = marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].price;
        address seller = marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].seller;
        uint _marketSellingCount = getMarketSellingItemsCount(_nftContractAddress);

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        require(_marketSellingCount > 0, "Market selling no item");

        IERC721 nft = IERC721(_nftContractAddress);

        marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].owner = payable (msg.sender);
        marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].sold = true;
        marketItemsOfAddress[_nftContractAddress].marketItem[_nftId].seller = payable (address(0));

        nft.transferFrom(address(this), msg.sender, _nftId);

        payable (marketOwner).transfer(listingPrice);
        payable (seller).transfer(msg.value);

        marketItemsOfAddress[_nftContractAddress].sellingItemCount.decrement();

        emit MarketItemSold(_nftContractAddress, _nftId, msg.value);
    }
    function cancelListedItem(address _nftContractAddress, uint256 _nftId) public payable {
        MarketItem storage item = marketItemsOfAddress[_nftContractAddress].marketItem[_nftId];

        require(msg.sender == item.seller, "List cancel can do by seller");
        require(!item.sold, "Item cancel just can by unsold");

        IERC721 nft = IERC721(_nftContractAddress);

        item.sold = true;
        item.owner = payable (item.seller);
        item.price = 0;

        nft.transferFrom(address(this), item.seller, _nftId);

        payable (marketOwner).transfer(listingPrice);

        marketItemsOfAddress[_nftContractAddress].sellingItemCount.decrement();

        emit MarketItemListcancel(_nftContractAddress, _nftId);
    }

    // offer
    function offerMarketItem(address _nftContractAddress, uint256 _nftId, uint256 _endTime) public payable {
        require(msg.value > 0, "Please submit the correct price");
        OfferList storage offerList = marketItemOffer[_nftContractAddress].marketItem[_nftId];
        offerList.totalOfferCount.increment();
        uint256 tempIndex = offerList.totalOfferCount.current();

        offerList.offerDetail[tempIndex].nft = _nftContractAddress;
        offerList.offerDetail[tempIndex].nftId = _nftId;
        offerList.offerDetail[tempIndex].offerer = msg.sender;
        offerList.offerDetail[tempIndex].price = msg.value;
        offerList.offerDetail[tempIndex].remainPrice = msg.value;
        offerList.offerDetail[tempIndex].endTime = _endTime;
        offerList.offerDetail[tempIndex].ended = false;

        emit MarketItemOffer(_nftContractAddress, _nftId, tempIndex, msg.value, _endTime);
    }
    function acceptOffer(address _nftContractAddress, uint _tokenId, uint256 _offerIndex) public payable {
        OfferDetail storage offer = marketItemOffer[_nftContractAddress].marketItem[_tokenId].offerDetail[_offerIndex];

        require(offer.endTime > block.timestamp, "offer is invalid");
        require(!offer.ended, "Offer is already ended");
        require(offer.remainPrice > 0, "Offer has invalid remainPrice");

        IERC721 nft = IERC721(_nftContractAddress);

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

            emit OfferAccept(_nftContractAddress, _tokenId, _tempPrice, offer.offerer);
        } else {
            offer.remainPrice = _tempPrice;
        }
    }
    function withdrawOutdatedOffer(address _nftContractAddress, uint _tokenId, uint256 _offerIndex) external returns (bool) {
        OfferDetail storage offer = marketItemOffer[_nftContractAddress].marketItem[_tokenId].offerDetail[_offerIndex];

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
    function getVersion() external view returns (string memory) {
        return version;
    }
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
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
    function getItemInfoOnMarket(address _nftContractAddress, uint _tokenId) public view returns (MarketItem memory){
        MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[_tokenId];
        return tempItem;
    }
    function getMarketItems(address _nftContractAddress) public view returns (MarketItem[] memory) {
        uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);

        MarketItem[] memory searchedItems = new MarketItem[](_marketItemsCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketItemsCount; i++) {
            uint currentId = i + 1;
            MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
            searchedItems[currentIndex] = tempItem;
            currentIndex++;
        }

        return searchedItems;
    }
    function getMarketSellingItems(address _nftContractAddress) public view returns (MarketItem[] memory) {
        uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);
        uint256 _marketSellingItemsCount = getMarketSellingItemsCount(_nftContractAddress);

        MarketItem[] memory searchedItems = new MarketItem[](_marketSellingItemsCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketItemsCount; i++) {
            uint currentId = i + 1;
            MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
            if(!tempItem.sold){
                searchedItems[currentIndex] = tempItem;
                currentIndex++;
            }
        }

        return searchedItems;
    }
    function getMarketSoldItems(address _nftContractAddress) public view returns (MarketItem[] memory) {
        uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);
        uint256 _marketSoldItemsCount = getMarketItemsCount(_nftContractAddress) - getMarketSellingItemsCount(_nftContractAddress);

        MarketItem[] memory searchedItems = new MarketItem[](_marketSoldItemsCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketItemsCount; i++) {
            uint currentId = i + 1;
            MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
            if(tempItem.sold){
                searchedItems[currentIndex] = tempItem;
                currentIndex++;
            }
        }

        return searchedItems;
    }
    function getTotalMarketItems() public view returns (MarketItem[] memory) {
        uint256 _totalCount = getTotalMarketItemsCount();
        uint256 _marketsCount = getMarketsCount();

        MarketItem[] memory searchedItems = new MarketItem[](_totalCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketsCount; i++){
            address _nftContractAddress = nftContractAddress[i];
            uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);

            for(uint j = 0; j < _marketItemsCount; j++) {
                uint currentId = j + 1;
                MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
                searchedItems[currentIndex] = tempItem;
                currentIndex++;
            }
        }

        return searchedItems;
    }
    function getTotalMarketSellingItems() public view returns (MarketItem[] memory) {
        uint256 _marketsCount = getMarketsCount();
        uint256 _sellingItemsCount = 0;

        for(uint i = 0; i < _marketsCount; i++){
            address _nftContractAddress = nftContractAddress[i];
            _sellingItemsCount += getMarketSellingItemsCount(_nftContractAddress);
        }

        MarketItem[] memory searchedItems = new MarketItem[](_sellingItemsCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketsCount; i++){
            address _nftContractAddress = nftContractAddress[i];
            uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);

            for(uint j = 0; j < _marketItemsCount; j++) {
                uint currentId = j + 1;
                MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
                if(!tempItem.sold){
                    searchedItems[currentIndex] = tempItem;
                    currentIndex++;
                }
            }
        }

        return searchedItems;
    }
    function getTotalMarketSoldItems() public view returns (MarketItem[] memory) {
        uint256 _marketsCount = getMarketsCount();
        uint256 _soldItemsCount = 0;

        for(uint i = 0; i < _marketsCount; i++){
            address _nftContractAddress = nftContractAddress[i];
            _soldItemsCount += (getMarketItemsCount(_nftContractAddress) - getMarketSellingItemsCount(_nftContractAddress));
        }

        MarketItem[] memory searchedItems = new MarketItem[](_soldItemsCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _marketsCount; i++){
            address _nftContractAddress = nftContractAddress[i];
            uint256 _marketItemsCount = getMarketItemsCount(_nftContractAddress);

            for(uint j = 0; j < _marketItemsCount; j++) {
                uint currentId = j + 1;
                MarketItem memory tempItem = marketItemsOfAddress[_nftContractAddress].marketItem[currentId];
                if(tempItem.sold){
                    searchedItems[currentIndex] = tempItem;
                    currentIndex++;
                }
            }
        }

        return searchedItems;
    }
    function getOfferList(address _nftContractAddress, uint _tokenId) public view returns (OfferDetail[] memory) {
        OfferList storage offer = marketItemOffer[_nftContractAddress].marketItem[_tokenId];

        uint256 _offerTotalCount = offer.totalOfferCount.current();

        OfferDetail[] memory searchedItems = new OfferDetail[](_offerTotalCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _offerTotalCount; i++) {
            uint currentId = i + 1;
            OfferDetail memory tempItem = offer.offerDetail[currentId];
            searchedItems[currentIndex] = tempItem;
            currentIndex++;
        }

        return searchedItems;
    }
    function getMyOutdatedOffers(address _nftContractAddress, uint _tokenId) public view returns (OfferDetail[] memory) {
        OfferList storage offer = marketItemOffer[_nftContractAddress].marketItem[_tokenId];
        uint256 _offerTotalCount = offer.totalOfferCount.current();
        uint256 _myOffersCount = 0;

        for(uint i = 0; i < _offerTotalCount; i++) {
            uint currentId = i + 1;
            if(offer.offerDetail[currentId].offerer == msg.sender){
                _myOffersCount++;
            }
        }

        OfferDetail[] memory searchedItems = new OfferDetail[](_myOffersCount);
        uint256 currentIndex = 0;

        for(uint i = 0; i < _offerTotalCount; i++) {
            uint currentId = i + 1;
            if(offer.offerDetail[currentId].offerer == msg.sender){
                OfferDetail memory tempItem = offer.offerDetail[currentId];
                searchedItems[currentIndex] = tempItem;
                currentIndex++;
            }
        }
        return searchedItems;
    }
}

