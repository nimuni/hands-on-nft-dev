// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AccessControl {
    // Role
    bytes32 public constant ADMIN_ROLE = keccak256(abi.encodePacked("ADMIN_ROLE"));
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MARKET_LISTER_ROLE = keccak256("MARKET_LISTER_ROLE");
    bytes32 public constant AUCTION_LISTER_ROLE = keccak256("AUCTION_LISTER_ROLE");
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");

    event GrantRole(bytes32 indexed role, address indexed account);
    event RevokeRole(bytes32 indexed role, address indexed account);

    bool public onlyGrant = false;
    // 권한 부여 여부 check
    error OnlyRole(bytes32 _role);

    mapping(bytes32 => mapping(address => bool)) public roles;

    modifier onlyRole(bytes32 _role) {
        if(onlyGrant){
            if(!roles[_role][msg.sender]) {
                revert OnlyRole(_role);
            }
        } else {
            if(ADMIN_ROLE == _role){
                if(!roles[ADMIN_ROLE][msg.sender]) {
                    revert OnlyRole(_role);
                }
            }
        }
        _;
    }
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MARKET_LISTER_ROLE, msg.sender);
        _grantRole(AUCTION_LISTER_ROLE, msg.sender);
    }
    function setOnlyGrant(bool value) external onlyRole(ADMIN_ROLE){
        onlyGrant = value;
    }
    function grantRole(bytes32 _role, address _account) public onlyRole(ADMIN_ROLE)  {
        _grantRole(_role,_account);
        emit GrantRole(_role, _account);
    }
    function _grantRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = true;
    }
    function revokeRole(bytes32 _role, address _account) public onlyRole(ADMIN_ROLE)  {
        _revokeRole(_role,_account);
    }
    function _revokeRole(bytes32 _role, address _account) internal {
        roles[_role][_account] = false;
        emit RevokeRole(_role, _account);
    }
}