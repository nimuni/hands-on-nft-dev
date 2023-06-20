// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./AccessControl-v2.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract HandsOnNFT_ERC1155 is ERC1155, AccessControl, ERC1155Burnable, ERC1155Supply {
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

    function mintBatch(address _to, uint256[] memory _amounts, uint256[] memory _ids, bytes memory _data) public onlyRole(MINTER_ROLE) {
        require(_ids.length == _amounts.length, "NFT_ERC1155_HNM: ids and amounts length mismatch");

        uint256[] memory newIds = new uint256[](_ids.length);

        for (uint256 i = 0; i < _ids.length; i++) {
            _tokenIds.increment();
            newIds[i] = _tokenIds.current();
            _setTokenURI(newIds[i], _tokenURIs[_ids[i]]);
        }

        _mintBatch(_to, newIds, _amounts, _data);
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 _interfaceId) public view override(ERC1155) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}