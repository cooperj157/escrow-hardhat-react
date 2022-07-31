import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import { ethers } from 'ethers';


export default async function deploy(arbiter, beneficiary, value){

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await window.ethereum.request({method: 'eth_requestAccounts'});
  const signer = provider.getSigner();
  
  const EscrowFactory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer);
  
  const valueToWei = ethers.utils.parseEther(value);
  const escrow = await EscrowFactory.deploy(arbiter,beneficiary,{ value: valueToWei });
  await escrow.deployTransaction.wait();
  
  const address = escrow.address;
  
  return address;
  
  }
