// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HandsOnMarketplaceMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    // 팔린 NFT 수
    Counters.Counter private _soldCount;
    // 등록된 NFT 수
    Counters.Counter private _sellingCount;

    // 고정 마켓등록 수수료
    uint256 public LISTING_FEE = 0.0001 ether;

    address payable private _marketOwner;
    
    // 판매할 NFT의 정보를 등록할 map 저장소
    mapping (uint256 => NFT ) private _idToNFT;

    // NFT 구조체
    struct NFT {
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 tokenId;
        uint256 price;
        bool isSelling;
    }

    // 이벤트 설정
    event NFTListedUp(address nftContract, address seller, address owner, uint256 tokenId, uint256 price);
    event NFTSold(address nftContract, address seller, address owner, uint256 tokenId, uint256 price);

    // 생성자
    constructor(){
        _marketOwner = payable(msg.sender);
    }

    // market에 NFT 등록 - 첫등록
    function sellNFT(address _nftContract, uint256 _tokenId, uint256 _price) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee");

        IERC721(_nftContract).safeTransferFrom(msg.sender, address(this), _tokenId);
        _sellingCount.increment();
        // 판매할 NFT의 정보를 등록
        _idToNFT[_tokenId] = NFT(_nftContract, payable(msg.sender), payable(address(this)), _tokenId, _price, true);

        // 이벤트 호출
        emit NFTListedUp(_nftContract, msg.sender, address(this), _tokenId, _price);
    }
    // 마켓에서 구매한 NFT 재판매 - 마켓에 등록하는 절차만 다름
    function resellNFT(address _nftContract, uint256 _tokenId, uint256 _price) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee");

        IERC721(_nftContract).safeTransferFrom(msg.sender, address(this), _tokenId);
        // 마켓에 이미 등록되어있는 NFT의 정보를 변수에 할당
        NFT storage nft = _idToNFT[_tokenId];
        nft.seller = payable(msg.sender);
        nft.owner = payable(address(this));
        nft.isSelling = true;
        nft.price = _price;

        _soldCount.decrement();

        // 이벤트 호출
        emit NFTListedUp(_nftContract, msg.sender, address(this), _tokenId, _price); 
    } 

    // NFT 구매
    function buyNFT(address _nftContract, uint256 _tokenId) public payable nonReentrant{
        // Storage에 저장된 변수를 모든 경우 하나하나 호출하기 힘드므로 변수에 할당
        NFT storage nft = _idToNFT[_tokenId];

        require(msg.value >= nft.price, "Not enough ether to cover asking price");

        address payable buyer = payable(msg.sender);
        payable(nft.seller).transfer(msg.value);
        // NFT 전송
        IERC721(_nftContract).safeTransferFrom(address(this), buyer, nft.tokenId);
        _marketOwner.transfer(LISTING_FEE);
        nft.owner = buyer;
        nft.isSelling = false;

        _soldCount.increment();

        // 이벤트 호출
        emit NFTSold(_nftContract, nft.seller, buyer, nft.tokenId, msg.value);
    }


    // 등록비용 조회
    function getListingFee() public view returns (uint256) {
        return LISTING_FEE;
    }

    // 마켓에 등록된, 아직 안팔린 NFT 리스트 조회
    function getListedNFTs() public view returns (NFT[] memory) {
        uint256 sellingCount = _sellingCount.current();
        uint256 unsoldNFTCound = sellingCount - _soldCount.current();

        NFT[] memory unsoldNFTs = new NFT[](unsoldNFTCound);
        uint nftsIndex = 0;
        for(uint i=0; i<sellingCount; i++) {
            if (_idToNFT[i+1].isSelling) {
                unsoldNFTs[nftsIndex] = _idToNFT[i+1];
                nftsIndex++;
            }
        }
        return unsoldNFTs;
    }

    // 마켓에 등록된 내 NFT 리스트 조회
    function getMyNFTs() public view returns (NFT[] memory) {
        uint sellingCount = _sellingCount.current();
        uint myNFTsCount = 0;

        for(uint i=0; i<sellingCount; i++) {
            if (_idToNFT[i+1].owner == msg.sender) {
                myNFTsCount++;
            }
        }

        NFT[] memory myNFTs = new NFT[](myNFTsCount);
        uint nftsIndex = 0;
        for(uint i=0; i<sellingCount; i++) {
            if (_idToNFT[i+1].owner == msg.sender) {
                myNFTs[nftsIndex] = _idToNFT[i+1];
                nftsIndex++;
            }
        }
        return myNFTs;
    }

    // 마켓에 등록되었고, 아직 판매중인 내 NFT 리스트 조회
    function getMySellingNFTs() public view returns (NFT[] memory) {
        uint sellingCount = _sellingCount.current();
        uint mySellingNFTsCount = 0;
        for (uint i=0; i<sellingCount; i++) {
            if (_idToNFT[i+1].seller == msg.sender && _idToNFT[i+1].isSelling) {
                mySellingNFTsCount++;
            }
        }

        NFT[] memory mySellingNFTs = new NFT[](mySellingNFTsCount);
        uint nftsIndex = 0;
        for (uint i=0; i<sellingCount; i++) {
            if (_idToNFT[i+1].seller == msg.sender && _idToNFT[i+1].isSelling) {
                mySellingNFTs[nftsIndex] = _idToNFT[i+1];
                nftsIndex++;
            }
        }
        return mySellingNFTs;
    }
}