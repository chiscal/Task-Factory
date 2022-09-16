// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;
import "./createAd.sol";

contract UserBase {
    uint key = 1;
    event Created(address indexed _addr, string indexed _name, uint _total_locked);

    mapping (address => address[]) public userAds;
    address [] Ads;

    modifier lock() {
        require(key == 1,"transaction in progress");
        key = 0;
        _;
        key = 1;
    }

    function getUserAds(address _user) external view returns(address[] memory){
        return userAds[_user];
    }

    function createAd(string memory _name, string memory _link, string memory _description, string memory _image, uint _cpc) payable external {
        CreateAd newAd = new CreateAd{value: msg.value}(_name, _link, _description, _image, _cpc);
        userAds[msg.sender].push(address(newAd));
        Ads.push(address(newAd));
        emit Created(msg.sender, _name, msg.value);
    }

    function getAds() external view returns(address [] memory) {
        return Ads;
    }
}