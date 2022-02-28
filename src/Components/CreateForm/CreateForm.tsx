import React, {forwardRef, LegacyRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateForm(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const ExampleCustomInput = forwardRef(({ value, onClick }:any, ref:LegacyRef<HTMLButtonElement>) => (
        <button className="custom-datepicker" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return(
        <div className="create-form">
            <input type="text" placeholder="어떤 일정인가요?"/>
            <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} customInput={<ExampleCustomInput />}/>
            <p>~</p>
            <DatePicker selected={endDate} onChange={(date:Date) => setEndDate(date)} customInput={<ExampleCustomInput />}/>
            <input type="text" placeholder="메모"/>
            <button className="add"><i className="fa-solid fa-location-arrow"></i></button>
        </div>
    )
}
export default CreateForm;