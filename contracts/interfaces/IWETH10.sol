//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IWETH10 {
    function flashLoan(
        address receiver,
        address token,
        uint256 value,
        bytes calldata data
    ) external returns (bool);
    
}