import { useState } from "react";
import deploy from './deploy';
import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import Contracts from './Contracts';

const provider = new ethers.providers.Web3Provider(window.ethereum);
let contractAddr = '';
let counter = 1;
function App() {
  
  const [inputText, changeText] = useState(['','',0]);
  const [contract, newContract] = useState([{
    id: 0,
  }]);

  function handleArbiterChange(event){
    changeText([event.target.value,inputText[1],inputText[2]]);
  }

  function handleBeneficiaryChange(event){
    changeText([inputText[0],event.target.value, inputText[2]]);
  }

  function handleAmountChange(event){
    changeText([inputText[0],inputText[1],event.target.value]);
  }

  async function setAddresses(){
    const arbiter = '0x9cA10872Bf1183EF561A9C93D1BDA9D2Eeb1a49E';
    const beneficiary = '0xCd55Cf96929064a924EEE9E2Ea53d802b5C7DcD9';
    changeText([arbiter,beneficiary,inputText[2]]);
  }

  async function createContract(){
    const _arbiter = inputText[0];
    const _beneficiary = inputText[1];
    const _value = inputText[2];

    contractAddr = await deploy(_arbiter, _beneficiary, _value);

    newContract([...contract,{
      id: counter,
      arbiter: 'Arbiter: '+_arbiter,
      beneficiary: 'Beneficiary: '+_beneficiary,
      address: contractAddr,
      value: 'Value: '+ _value + " Eth",
      releaseMsg: 'Release the funds',
      status: "Status: Active",
      disabled: false,
      buttonColor: 'green'
    }]);
    counter++;
  }

  async function releaseFunds(id){

    const _address = contract[id].address;
    const thisContract = new ethers.Contract(_address,Escrow.abi,provider);

    const _id = contract[id].id;
    const _arbiter = contract[id].arbiter;
    const _beneficiary = contract[id].beneficiary;
    const _value = contract[id].value;

    let contractsUpToID = contract.slice(0,id);
    let contractsAfterID = null;
    if(counter > id){
      contractsAfterID = contract.slice(id+1);
    }
    
    await thisContract.connect(provider.getSigner(0)).release();
    newContract([...contractsUpToID, {
      id: _id,
      arbiter: _arbiter,
      beneficiary: _beneficiary,
      address: _address,
      value: _value,
      releaseMsg: 'Released',
      status: "Status: Funds have been released, now inactive",
      disabled: true,
      buttonColor: 'red'
    },...contractsAfterID]);
    
  }

  return (
    <div>
      <div className="inputFields">
        <label htmlFor='arbiterField'>Arbiter</label>
        <input type="text" value={inputText[0]} name='arbiterField' onChange={handleArbiterChange}/>
        <label htmlFor='beneficiaryField'>Beneficiary</label>
        <input type="text" value={inputText[1]} name='beneficiaryField' onChange={handleBeneficiaryChange} />
        <label htmlFor='amountField'>Amount</label>
        <input type="text" value={inputText[2]} name='amountField' onChange={handleAmountChange} />
        <button id='createButton' onClick={createContract}>Create Contract</button>
        <button id='setAddresses' onClick={setAddresses}>fill the fields with addresses</button>
      </div>
      <div id='contractsHeader'>
        <div >Your Contracts</div>
      </div>
      <div id='contracts'>
        {contract.map((contr, i)=> <Contracts contract={contr} key={i} onClick={async()=>releaseFunds(contr.id)}/>)}
      </div>  
        
    </div>
      
  );
} 

export default App;
