import { useState } from "react";
import deploy from './deploy';
import { ethers } from 'ethers';
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';
import Contracts from './Contracts';


const provider = new ethers.providers.Web3Provider(window.ethereum);
let contractAddr = '';

function App() {
  
  const [inputText, changeText] = useState(['','',0]);
  const [contract, newContract] = useState(["Once you create a contract it will be placed below",{
    display: 'none'
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
    const arbiter = '0xf828A0A5Fa2153ba81eC315C04ecd101a04A7b50';
    const beneficiary = '0xCd55Cf96929064a924EEE9E2Ea53d802b5C7DcD9';
    const value = "100000000000000000";
    changeText([arbiter,beneficiary,value]);
    
  }

  async function createContract(){
    const _arbiter = inputText[0];
    const _beneficiary = inputText[1];
    const _value = inputText[2];
    contractAddr = await deploy(_arbiter, _beneficiary, _value);

    newContract(["Your contract:",{
      arbiter: 'Arbiter: '+_arbiter,
      beneficiary: 'Beneficiary: '+_beneficiary,
      address: 'Address: '+ contractAddr,
      value: 'Value: '+ _value,
      releaseMsg: 'Release the funds',
      status: "Status: Active",
      disabled: false
    }]);
    
  }

  async function releaseFunds(){
    const thisContract = new ethers.Contract(contractAddr,Escrow.abi,provider);
    const _arbiter = contract[1].arbiter;
    const _beneficiary = contract[1].beneficiary;
    const _address = contract[1].address;
    const _value = contract[1].value;

    await thisContract.connect(provider.getSigner(0)).release();
    newContract(["Your contract:",{
      arbiter: _arbiter,
      beneficiary: _beneficiary,
      address: _address,
      value: _value,
      releaseMsg: 'Released',
      status: "Status: Funds have been released - inactive",
      disabled: true
    }]);
    
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
      <div>
        <Contracts contract={contract} onClick={releaseFunds}/>
      </div>
        
    </div>
      
  );
} 

export default App;
