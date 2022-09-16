// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

contract CreateAd is EIP712{
    address public owner;
    mapping (address => bool) clicked;
    string private constant name = "TASK FACTORY";
    string private constant version = "1";
    uint public clicks;
    uint key = 1;

    struct AdInfo {
        string name;
        string link;
        string description;
        string image;
        uint cpc;
        uint eth_locked;
        address ad_address;
        uint matic_bal;
    }

    AdInfo details;

    modifier lock() {
        require(key == 1,"transaction in progress");
        key = 0;
        _;
        key = 1;
    }

    constructor(string memory _name, string memory _link, string memory _description, string memory _image, uint _cpc) EIP712(name, version) payable {
        owner = tx.origin;
        details = AdInfo(_name, _link, _description, _image, _cpc, msg.value, address(this), address(this).balance);
    }

    function click(address _addr, bytes memory signature) external lock {
        require(_addr != address(0) && _hashVerifyClick(_addr, signature) == _addr, "Invalid Signature");
        require(ethLeft() > details.cpc, "Insufficient Balance");
        require(clicked[_addr] != true, "User Cannot Click more than once");
        require(msg.sender != owner, "owner cannot click ads");
        payable(_addr).transfer(details.cpc);
        clicks+=1;
        clicked[_addr] = true;
    }

    function _hashVerifyClick(address _addr, bytes memory signature) private view returns(address) {
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(keccak256("click(address _addr)"), _addr)));
        address clicker = ECDSA.recover(digest, signature);
        return clicker;
    }


    function ethLeft() public view returns(uint256) {
        return address(this).balance;
    }

    function getAdInfo() external view returns(AdInfo memory) {
        return details;
    }

    function deleteAd() external {
        require(msg.sender == owner);
        selfdestruct(payable(owner));
    }
}