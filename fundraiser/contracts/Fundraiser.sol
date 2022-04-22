// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Fundraiser is Ownable {
  string public name;
  string public website;
  string public imageUrl;
  string public  description;

  address payable public beneficiary;
  address public custodian;

  constructor(
    string memory _name,
    string memory _website,
    string memory _imageUrl,
    string memory _description,
    address payable _beneficiary,
    address _custodian
  ) {
    name = _name;
    website = _website;
    imageUrl = _imageUrl;
    description = _description;
    beneficiary = _beneficiary;
    _transferOwnership(_custodian);
  }

  function setBeneficiary(address payable _beneficiary) public onlyOwner {
    beneficiary = _beneficiary;
  }
}
