const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  it("should deposit 1 eth ", async function () {
    const depositor = await ethers.provider.getSigner(0).getAddress();
    const arbiter = await ethers.provider.getSigner(1).getAddress(); 
    const beneficiary = await ethers.provider.getSigner(2).getAddress();
    
    
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
  
    
  // describe("arbiter should be allowed to release funds", async function(){
  //   it("should give the funds to the beneficiary", async function(){

  //   });

  //});
    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
