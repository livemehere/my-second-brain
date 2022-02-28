import React from "react";
import CreateForm from "../CreateForm/CreateForm";
import Box from "../Box/Box";

function Board(){
    return (
        <div className="board">
            <CreateForm/>
            <div className="boxes">
                <Box title="오늘"/>
                <Box title="예정"/>
            </div>
        </div>
    )
}
export default Board;