// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
const {deployer} = await ethers.getSigner();
const Stacking = await ethers.getContractFactory('StakingToken');
const stacking = await Stacking.deploy();
await stacking.deployed();
  console.log("the contract is deployed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
