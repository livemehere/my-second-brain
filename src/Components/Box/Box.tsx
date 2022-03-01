import React from "react";
import List from "../List/List";

interface BoxProps{
    title:string;
    selected:string;
}

function Box({title,selected}:BoxProps){
    return(
        <div className={`box ${selected === 'done' && "box-margin"}`}>
            <h1>{title}</h1>
            <List/>
        </div>
    )
}
export default Box;