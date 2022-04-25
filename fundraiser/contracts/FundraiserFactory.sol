// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Fundraiser.sol';

contract FundraiserFactory {
  uint256 constant maxLimit = 20;

  Fundraiser[] private _fundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  function fundraisersCount () public view returns (uint256) {
    return _fundraisers.length;
  }

  function createFundraiser (
    string memory name,
    string memory url,
    string memory imageUrl,
    string memory description,
    address payable beneficiary
  ) public {
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageUrl,
      description,
      beneficiary,
      msg.sender
    );

    _fundraisers.push(fundraiser);

    emit FundraiserCreated(fundraiser, msg.sender);
  }

  function fundraisers(
    uint256 limit, 
    uint256 offset
    ) public view returns (Fundraiser[] memory coll) {
      uint256 size = fundraisersCount() < limit ? fundraisersCount() : limit;
      size = size < maxLimit ? size : maxLimit;

      coll = new Fundraiser[](size);

      for (uint256 i = 0; i < size; i++) {
        coll[i] = _fundraisers[offset + i];
      }

      return coll;
  }
}