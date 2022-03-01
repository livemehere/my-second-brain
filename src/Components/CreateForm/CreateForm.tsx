import React, {forwardRef, LegacyRef, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useDispatch} from "react-redux";
import {add} from "../../modules/Item";

function CreateForm(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [title,setTitle] = useState("");
    const [memo,setMemo] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const ExampleCustomInput = forwardRef(({ value, onClick }:any, ref:LegacyRef<HTMLButtonElement>) => (
        <button className="custom-datepicker" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const handleClick=()=>{
        if(title.length <= 0){
            return alert('일정 제목을 입력해주세요');
        }
        dispatch(add({title,startDate:startDate.toDateString(),endDate:endDate.toDateString(),memo,complete:false}))
        setTitle("");
        setMemo("");
        inputRef.current?.focus();
    }

    return(
        <div className="create-form">
            <input type="text" placeholder="어떤 일정인가요?" value={title} onChange={(e)=>setTitle(e.target.value)} ref={inputRef}/>
            <DatePicker dateFormat="yyyy.MM.dd" selected={startDate} onChange={(date:Date) => setStartDate(date)} customInput={<ExampleCustomInput />}/>
            <p>~</p>
            <DatePicker dateFormat="yyyy.MM.dd" selected={endDate} onChange={(date:Date) => setEndDate(date)} customInput={<ExampleCustomInput />}/>
            <input type="text" placeholder="메모" value={memo}  onChange={(e)=>setMemo(e.target.value)}/>
            <button className="add" onClick={handleClick}><i className="fa-solid fa-location-arrow"></i></button>
        </div>
    )
}
export default CreateForm;