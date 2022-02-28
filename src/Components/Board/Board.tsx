import React from "react";
import CreateForm from "../CreateForm/CreateForm";
import Box from "../Box/Box";

function Board(){
    //TODO: 여기서 data axios 받아오고, redux로 정보넣기
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