const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")
require("dotenv").config()

!developmentChains.includes(network.name)
    ? describe.skip      
    : describe("WETH FlashMint", function () {
        let testWethFlashMint, weth, deployer
        const MAINNET_FORK = process.env.MAINNET_RPC_URL
        const WETH_10 = "0xf4BB2e28688e89fCcE3c0580D37d36A7672E8A9F";
        const WETH10_ABI = [
            "function flashLoan(IERC3156FlashBorrower receiver, address token, uint256 value, bytes calldata data) external override returns (bool)"
        ]
        const provider = new ethers.providers.JsonRpcProvider(MAINNET_FORK)
        const FakePrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
        const wallet = new ethers.Wallet(FakePrivateKey, provider)
        
        
        

        beforeEach(async function () {
            
            //deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            weth = new ethers.Contract(WETH_10, WETH10_ABI, wallet)
            testWethFlashMint = await ethers.getContract("TestWethFlashMint")
        })

        it("Flash", async () => {
            console.log(wallet)
            console.log("---------------------------------")
            const txResponse = await testWethFlashMint.flash()
            const txReceipt = txResponse.wait(1)
            console.log(`contract: ${await testWethFlashMint.address}`)
            console.log(`sender: ${await testWethFlashMint.sender()}`)
            console.log(`token: ${await testWethFlashMint.token()}`)

            console.log(await txReceipt)

            //for(const log of txReceipt.logs) {
            //    console.log(`${log.args.name} ${log.args.val}`)
            //}
        })
    })