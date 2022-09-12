const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config.js")

!developmentChains.includes(network.name)
    ? describe.skip      
    : describe("WETH FlashMint", function () {
        let testWethFlashMint, weth
        const WETH_10 = "0xf4BB2e28688e89fCcE3c0580D37d36A7672E8A9F";
        const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        const WETH_WHALE = "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268";

        beforeEach(async function () {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            weth = await ethers.getContract(WETH_10)
            testWethFlashMint = await ethers.getContract("TestWethFlashMint")
        })

        it("Flash", async () => {
            const tx = await testWethFlashMint.flash()
            console.log(`contract: ${await testWethFlashMint.address}`)
            console.log(`sender: ${await testWethFlashMint.sender()}`)
            console.log(`token: ${await testWethFlashMint.token()}`)

            for(const log of tx.logs) {
                console.log(`${log.args.name} ${log.args.val}`)
            }
        })
    })