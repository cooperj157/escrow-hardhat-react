//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

contract Escrow {
    address public depositor;
    address public arbiter;
    address payable public beneficiary;
    
    bool public isApproved;

    event Approved(uint);

    constructor(address _arbiter, address payable _beneficiary) payable {
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        
    }

    function release() external{
        require(msg.sender == arbiter);
        uint balance = address(this).balance;
        beneficiary.transfer(balance);
        emit Approved(balance);
        isApproved = true;
    }

    
}
