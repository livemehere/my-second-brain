import React from "react";

function Menu(){
    return (
        <div className="menu">
            <div className="item">
                <i className="fa-solid fa-calendar"></i>
                <p>일정</p>
            </div>
            <div className="item">
                <i className="fa-solid fa-check"></i>
                <p>완료 일정</p>
            </div>
        </div>
    );
}

export default Menu;