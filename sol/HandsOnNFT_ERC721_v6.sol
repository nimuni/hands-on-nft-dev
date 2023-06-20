// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AccessControl-v1.sol";

// v3은 ERC721 상속을 통해 mint token 대신 safemint 사용, _burn, tokenURI 오버라이드 구현
contract HandsOnNFT_ERC721 is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => uint256[]) creatorNFTs;

    constructor() ERC721("HandsOn NFT Marketplace v0.1.6", "HNM") {}

    event MintToken(address indexed to, uint256 indexed tokenId);

    function mintToken(address _to, string memory _tokenURI) public onlyRole(MINTER_ROLE) returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_to, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        creatorNFTs[msg.sender].push(newItemId);

        emit MintToken(_to, newItemId);

        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: caller is not owner nor approved");
        _burn(tokenId);
    }
}