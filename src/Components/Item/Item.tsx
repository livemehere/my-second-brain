import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {remove, update} from "../../modules/Item";

export interface ItemProps{
    id:number;
    title:string;
    startDate:string;
    endDate:string;
    memo:string;
    complete:boolean;
}

function Item({id,title, startDate,endDate, memo, complete}:ItemProps){
    const [isComplete,setIsComplete] = useState(complete);
    const dispatch = useDispatch();
    const handleCheck = ()=>{
        setIsComplete(prev=>!prev)
        dispatch(update(id));
    }
    const handleRemove = ()=>{
        dispatch(remove(id));
    }
    // 기간이 하루짜리면 물결 표시 안하기
    const isSameDate = new Date(startDate).toLocaleDateString() === new Date(endDate).toLocaleDateString();

    //TODO: date를 받아와서, d-day를 계산해야됨
    return(
        <div className="item">
            <div className="content">
                <div className="title">{title}{" "}
                    {isSameDate ?
                        <span className="date">{new Date(startDate).toLocaleDateString()}</span>
                    :
                    <>
                        <span className="date">{new Date(startDate).toLocaleDateString()} ~ </span>
                        <span className="date">{new Date(endDate).toLocaleDateString()}</span>
                    </>
                    }

                    <span className="d-day">D-1</span>
                </div>
                <p className="memo">{memo}</p>
            </div>
            <div className="check-box" onClick={handleCheck}>
                {isComplete ? <i className="fa-solid fa-check" /> : null}
            </div>
            <i className="fa-solid fa-trash remove" onClick={handleRemove} />
        </div>
    )
}

export default Item;