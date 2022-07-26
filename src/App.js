import { useState } from "react";


function App() {
  const [inputText, changeText] = useState(['','']);
  
  function handleArbiterChange(event){
    changeText([event.target.value,inputText[1]]);
  }

  function handleBeneficiaryChange(event){
    changeText([inputText[0],event.target.value]);
  }

  function createContract(){

  }
  return (
    <div className="inputFields">
      <label htmlFor='arbiterField'>Arbiter</label>
      <input type="text" value={inputText[0]} name='arbiterField' onChange={handleArbiterChange}/>
      <label htmlFor='beneficiaryField'>Beneficiary</label>
      <input type="text" value={inputText[1]} name='beneficiaryField' onChange={handleBeneficiaryChange} />
      <button id='createButton' onClick={createContract}>Create Contract</button>
    </div>
  );
}

export default App;
