import React, {useState} from "react";

function Item(){
    const [isComplete,setIsComplete] = useState(false);
    const handleCheck = ()=>{
        setIsComplete(prev=>!prev)
    }
    return(
        <div className="item">
            <div className="content">
                <div className="title">캡스톤 수업가기 <span className="date">2022.03.02</span></div>
                <p className="memo">3시30분까지 가야됨</p>
            </div>
            <div className="check-box" onClick={handleCheck}>
                {isComplete ? <i className="fa-solid fa-check" /> : null}
            </div>
        </div>
    )
}

export default Item;