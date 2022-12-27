// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// v3은 ERC721 상속을 통해 mint token 대신 safemint 사용, _burn, tokenURI 오버라이드 구현
contract NFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => uint256[]) creatorNFTs;

    constructor() ERC721("HandsOn NFT Marketplace", "HNM2") {}

    function mintToken(address to, string memory _tokenURI) public returns (uint256){
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        creatorNFTs[msg.sender].push(newItemId);

        return newItemId;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function totalSupply() external view returns (uint256){
        return _tokenIds.current();
    }

    function getCreatorNFTIds(address _creatorAddress) external view returns (uint256[] memory){
        return creatorNFTs[_creatorAddress];
    }
}