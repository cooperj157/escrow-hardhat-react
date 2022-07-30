

export default function Contracts(props){
    
    return (
        <div>
            <div className={'contract'}>
                <div>{props.contract.id}</div>
                <div>{props.contract.arbiter}</div>
                <div>{props.contract.beneficiary}</div>
                <div>{props.contract.address}</div>
                <div>{props.contract.value}</div>
                <div>{props.contract.status}</div>
                <button onClick={props.onClick} disabled={props.contract.disabled} style={{display: props.contract.display}}>{props.contract.releaseMsg}</button>
            </div>
        </div>
        
        
    )
}