import React from "react";

interface MenuItemProps{
    name:string;
    fontAwesomeIcon:string;
    handleClick:()=>void;
}

function MenuItem({name,fontAwesomeIcon,handleClick}:MenuItemProps){
    //TODO: changeBoardTo는 받아서 redux 상태 수정하기
    return(
        <div className="item" onClick={handleClick}>
            <i className={fontAwesomeIcon}/>
            <p>{name}</p>
        </div>
    );
}
export default MenuItem