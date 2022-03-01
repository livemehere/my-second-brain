// const isComplete = useState(false);

import React from "react";
import Item from "../Item/Item";
import {ItemType} from "../../modules/Item";

interface ListProps{
    data:ItemType[];
}

function List({data}:ListProps){
    return(
        <div className="list">
            {data.map(item=>(<Item key={item.id} id={item.id} title={item.title} startDate={item.startDate} endDate={item.endDate} memo={item.memo} complete={item.complete}/>))}
        </div>
    )
}

export default List;