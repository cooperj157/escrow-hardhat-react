const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {

it("should deposit 1 eth ", async function () {
  
  const arbiter = ethers.provider.getSigner(1).getAddress(); 
  const beneficiary = ethers.provider.getSigner(2).getAddress();
  
  const depositAmt = ethers.utils.parseEther("1");
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(arbiter,beneficiary,{
    value: depositAmt
  });

  await escrow.deployed();
  const escrowAdd = escrow.address;
  //get contract balance
  const balance = await ethers.provider.getBalance(escrowAdd);
  expect(depositAmt).to.equal(balance);
  console.log(balance);


describe("arbiter should be allowed to release funds", async function(){
  it("should give the funds to the beneficiary", async function(){
    
    const arbiter = ethers.provider.getSigner(1); 
    const beneficiary = ethers.provider.getSigner(2).getAddress();
    const arbiterAdd = arbiter.getAddress();

    const firstBeneficiaryBal = await ethers.provider.getBalance(beneficiary);
    const depositAmt = ethers.utils.parseEther("1");
    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy(arbiterAdd,beneficiary,{
      value: depositAmt
    });

    await escrow.deployed();
    await escrow.connect(arbiter).release();
    const newBeneficiaryBal = await ethers.provider.getBalance(beneficiary);
    expect(newBeneficiaryBal).to.equal(firstBeneficiaryBal.add(depositAmt).toString());
    
  });

  });
  describe("non-arbiter should not be allowed to release funds", async function(){
    it("should revert", async function(){
      
      const arbiter = ethers.provider.getSigner(1); 
      const beneficiary = ethers.provider.getSigner(2);
      const beneficiaryAdd = beneficiary.getAddress();
      const arbiterAdd = arbiter.getAddress();
    
      
      const depositAmt = ethers.utils.parseEther("1");
      const Escrow = await ethers.getContractFactory("Escrow");
      const escrow = await Escrow.deploy(arbiterAdd,beneficiaryAdd,{
        value: depositAmt
      });
    
      await escrow.deployed();
      await expect(escrow.connect(beneficiary).release()).to.be.reverted;
      
    });
  
  });
});
});
