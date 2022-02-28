import React from "react";
import MenuItem from "../MenuItem/MenuItem";

function Menu(){
    return (
        <div className="menu">
            <MenuItem fontAwesomeIcon="fa-solid fa-calendar" name="일정"  />
            <MenuItem fontAwesomeIcon="fa-solid fa-check" name="완료 일정"  />
        </div>
    );
}

export default Menu;