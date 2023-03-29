// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./AccessControl-v2.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT_ERC1155_HNM is ERC1155, AccessControl, ERC1155Burnable {
    string public version = "0.1.0";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping (uint256 => string) private _tokenURIs;

    event MintToken(address indexed to, uint256 indexed tokenId, uint256 amount);

    constructor() ERC1155("") {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }
    
    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function mint(address _to, uint256 _amount, string memory _tokenURI) public onlyRole(MINTER_ROLE) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId, _amount, "");
        _setTokenURI(newItemId, _tokenURI);

        emit MintToken(_to, newItemId, _amount);
    }

    function _setTokenURI(uint256 _tokenId, string memory _uri) internal {
        _tokenURIs[_tokenId] = _uri;
    }

    function mintBatch(address _to, uint256[] memory _ids, uint256[] memory _amounts, bytes memory _data) public onlyRole(MINTER_ROLE) {
        // require. amounts array의 길이와, uri array의 길이가 같아야 함.
        
        // ids array를 만들어야함. from counter. 시작부터 
        // uri array를 받아서, 
        _mintBatch(_to, _ids, _amounts, _data);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 _interfaceId) public view override(ERC1155) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }
}