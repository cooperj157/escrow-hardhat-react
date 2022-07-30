
export default function Contracts(props){
    
    return ( 
            <div id={'contract'+props.contract.id}>
                <div id="listofcontracts">
                    <div className="lineItem">ID:</div>
                    <div className="lineItem">{props.contract.id}</div>
                    <div className="lineItem">{props.contract.arbiter}</div>
                    <div className="lineItem">{props.contract.beneficiary}</div>
                    <div className="lineItem">Address:</div>
                    <div className="lineItem">{props.contract.address}</div>
                    <div className="lineItem">{props.contract.value}</div>
                    <div className="lineItem">{props.contract.status}</div>
                    <button id='releaseButton' onClick={props.onClick} disabled={props.contract.disabled} style={{color: props.contract.buttonColor}}>{props.contract.releaseMsg}</button>
                </div>
            </div>     
    )
}