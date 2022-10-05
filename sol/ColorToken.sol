// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ColorToken is ERC721 {
    address public owner;
    uint256 tokenId = 1;

    struct Color {
        uint tokenId;
        string tokenName;
        address owner;
    }

    Color[] public allTokens;

    mapping(address => Color[]) public tokenAddress;
    mapping(string => bool) public tokenExist;

    constructor() ERC721("ColorToken", "HON-test"){
        owner = msg.sender;

    }

    function getAllTokens() public view returns (Color[] memory) {
        return allTokens;
    }

    function getMyTokens() public view returns (Color[] memory) {
        return tokenAddress[msg.sender];
    }

    function mintToken(string calldata _tokenName) public payable {
        require(!tokenExist[_tokenName], "Token already exists");

        _safeMint(msg.sender, tokenId);

        allTokens.push(Color(tokenId, _tokenName, msg.sender));

        tokenAddress[msg.sender].push(Color(tokenId, _tokenName, msg.sender));

        tokenExist[_tokenName] = true;

        tokenId++;
    }

    function 거래(from, to, tokenid) public payable {
      // valldate
      require(from 돈이있니?], "얘 돈 부족함 안됨");

      from balance(from) -- price
      to balance(to) ++ price

      allTokens[from] = true -> false
      allTokens[to] = false -> true
    }
}
