// const isComplete = useState(false);

import React from "react";
import Item from "../Item/Item";

function List(){
    return(
        <div className="list">
            <Item key="123" title="자기" date="2022.03.02" memo="메모는 없다" complete={false}/>
            <Item key="123" title="자기" date="2022.03.02" memo="메모는 없다" complete={true}/>
            <Item key="123" title="자기" date="2022.03.02" memo="메모는 없다" complete={true}/>
        </div>
    )
}

export default List;