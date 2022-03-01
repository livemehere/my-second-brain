import React from "react";
import List from "../List/List";
import {ItemType} from "../../modules/Item";

interface BoxProps{
    title:string;
    selected:string;
    data:ItemType[];
}

function Box({title,selected,data}:BoxProps){
   return(
        <div className={`box ${selected === 'done' && "box-margin"}`}>
            <h1>{title}</h1>
            <List data={data}/>
        </div>
    )
}
export default Box;