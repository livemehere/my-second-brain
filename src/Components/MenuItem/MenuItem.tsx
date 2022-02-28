import React from "react";

interface MenuItemProps{
    name:string;
    fontAwesomeIcon:string;
    changeBoardTo?:string;
}

function MenuItem({name,fontAwesomeIcon}:MenuItemProps){
    //TODO: changeBoardTo는 받아서 redux 상태 수정하기
    return(
        <div className="item">
            <i className={fontAwesomeIcon}/>
            <p>{name}</p>
        </div>
    );
}
export default MenuItem