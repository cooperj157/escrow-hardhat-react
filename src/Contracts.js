

export default function Contracts(props){
    
    return (
        <div>
            <div>
                <div>{props.contract[0]}</div>
            </div>
            <div className={'contract'}>
                <div>{props.contract[1].arbiter}</div>
                <div>{props.contract[1].beneficiary}</div>
                <div>{props.contract[1].address}</div>
                <div>{props.contract[1].value}</div>
                <div>{props.contract[1].status}</div>
                <button onClick={props.onClick} disabled={props.contract[1].disabled} style={{display: props.contract[1].display}}>{props.contract[1].releaseMsg}</button>
            </div>

        </div>
        
        
    )
}