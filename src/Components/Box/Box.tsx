import React from "react";
import List from "../List/List";

interface BoxProps{
    title:string;
}

function Box({title}:BoxProps){
    return(
        <div className="box today">
            <h1>{title}</h1>
            <List/>
        </div>
    )
}
export default Box;