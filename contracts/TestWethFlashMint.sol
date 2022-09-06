//SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./interfaces/IWETH10.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TestWethFlashMint {
    address private WETH = 0xf4BB2e28688e89fCcE3c0580D37d36A7672E8A9F;
    bytes32 public constant CALLBACK_SUCCESS = keccak256("ERC3156FlashBorrower.onFlashLoan");

    address public sender;
    address public token;

    event Log(string name, uint256 val);

    function flash() external {
        uint256 total = IERC20(WETH).totalSupply();
        // We borrow more then totalsupply which means we mint 1 additional Token
        uint256 amount = total + 1;
        emit Log("Total supply", total);
        IERC20(WETH).approve(WETH, amount);
        bytes memory data = "";
        IWETH10(WETH).flashLoan(address(this), WETH, amount, data);
    }

    // This function is called by IWETH10 interface as callback
    function onFlashLoan(
        address _sender,
        address _token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32) {
        uint256 bal = IERC20(WETH).balanceOf(address(this));
        sender = _sender;
        token = _token;

        emit Log("Amount", amount);
        emit Log("Fee", fee);
        emit Log("Balance", bal);

        return CALLBACK_SUCCESS;
    }
}