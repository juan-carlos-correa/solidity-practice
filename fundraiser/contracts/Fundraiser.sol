// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Fundraiser {
  string public name;
  string public website;
  string public imageUrl;
  string public  description;

  constructor(
    string memory _name,
    string memory _website,
    string memory _imageUrl,
    string memory _description
  ) public {
    name = _name;
    website = _website;
    imageUrl = _imageUrl;
    description = _description;
  }
}
