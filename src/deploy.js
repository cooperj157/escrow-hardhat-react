import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { ethers } from 'ethers';

export default async function deploy(arbiter, beneficiary, value){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await window.ethereum.request({method: 'eth_requestAccounts'});
  const signer = provider.getSigner(0);
  const EscrowFactory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer);
  
  const contractValue = ethers.BigNumber.from(value);
  const escrow = await EscrowFactory.deploy(arbiter,beneficiary,{ value: contractValue });
  await escrow.deployTransaction.wait();
  
  const address = escrow.address;
  console.log((await provider.getBalance(address)).toBigInt());
  
  return escrow;
  
  }