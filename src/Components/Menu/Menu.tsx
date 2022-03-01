import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import {useDispatch} from "react-redux";
import {calendar, done} from "../../modules/Menu";

function Menu(){

    const dispatch = useDispatch();
    const gotoCalendar = ()=>{
        dispatch(calendar());
    }
    const gotoDone = ()=>{
        dispatch(done());

    }

    return (
        <div className="menu">
            <MenuItem fontAwesomeIcon="fa-solid fa-calendar" name="일정"  handleClick={gotoCalendar}/>
            <MenuItem fontAwesomeIcon="fa-solid fa-check" name="완료 일정" handleClick={gotoDone} />
        </div>
    );
}

export default Menu;