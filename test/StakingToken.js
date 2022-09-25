const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {
  async function deployTokenFixture() {
    const StakingToken = await ethers.getContractFactory("StakingToken");
    const [owner, user] = await ethers.getSigners();

    const stakingToken = await StakingToken.deploy();

    await stakingToken.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { StakingToken, stakingToken, owner, user};
  }

      it("Token name should be same", async () => {
         const { stakingToken } = await loadFixture(deployTokenFixture);
        const TokenName = await stakingToken.name();
        console.log("TokenName: ", TokenName);
        expect(TokenName).to.equal("SHUBCOIN");

    });

         it('createStake creates a stake.', async () => {
           const { stakingToken ,owner, user } = await loadFixture(deployTokenFixture);
           await stakingToken.transfer(user, 3, { from: owner });
           await stakingToken.createStake(1, { from: user });

           expect.to.equal(await stakingToken.balanceOf(user), 2);
           expect.to.equal(await stakingToken.stakeOf(user), 1);
           expect.to.equal(
               await stakingToken.totalSupply(), 
               manyTokens.min(1).toString(10),
           );
           expect.to.equal(await stakingToken.totalStakes(), 1);
       });

           it('rewards are distributed.', async () => {
            const { stakingToken ,owner, user } = await loadFixture(deployTokenFixture);
           await stakingToken.transfer(user, 100, { from: owner });
           await stakingToken.createStake(100, { from: user });
           await stakingToken.distributeRewards({ from: owner });
          
           expect.to.equal(await stakingToken.rewardOf(user), 1);
           expect.to.equal(await stakingToken.totalRewards(), 1);
       }); 
        it('rewards can be withdrawn.', async () => {
            const { stakingToken ,owner, user } = await loadFixture(deployTokenFixture);
           await stakingToken.transfer(user, 100, { from: owner });
           await stakingToken.createStake(100, { from: user });
           await stakingToken.distributeRewards({ from: owner });
           await stakingToken.withdrawReward({ from: user });
          
           const initialSupply = manyTokens;
           const existingStakes = 100;
           const mintedAndWithdrawn = 1;

           expect.to.equal(await stakingToken.balanceOf(user), 1);
           expect.to.equal(await stakingToken.stakeOf(user), 100);
           expect.to.equal(await stakingToken.rewardOf(user), 0);
           expect.to.equal(
               await stakingToken.totalSupply(),
               initialSupply
                   .minus(existingStakes)
                   .plus(mintedAndWithdrawn)
                   .toString(10)
               );
           expect.to.equal(await stakingToken.totalStakes(), 100);
           expect.to.equal(await stakingToken.totalRewards(), 0);
       });   
    
}); 





