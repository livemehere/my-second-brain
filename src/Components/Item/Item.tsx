import React, {useState} from "react";

export interface ItemProps{
    title:string;
    date:string;
    memo:string;
    complete:boolean;
}

function Item({title, date, memo, complete}:ItemProps){
    const [isComplete,setIsComplete] = useState(complete);
    const handleCheck = ()=>{
        setIsComplete(prev=>!prev)
    }
    //TODO: date를 받아와서, d-day를 계산해야됨
    return(
        <div className="item">
            <div className="content">
                <div className="title">{title} <span className="date">{date}</span><span className="d-day">D-1</span></div>
                <p className="memo">{memo}</p>
            </div>
            <div className="check-box" onClick={handleCheck}>
                {isComplete ? <i className="fa-solid fa-check" /> : null}
            </div>
        </div>
    )
}

export default Item;