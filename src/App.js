import { useState } from "react";
import deploy from './deploy';
import { ethers } from 'ethers';

function App() {
  const [inputText, changeText] = useState(['','',0]);
  
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
    const arbiter = inputText[0];
    const beneficiary = inputText[1];
    const value = inputText[2];
    deploy(arbiter, beneficiary, value);
  }

  
  return (
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
  );
}

export default App;
