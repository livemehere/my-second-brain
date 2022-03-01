import React from "react";
import CreateForm from "../CreateForm/CreateForm";
import Box from "../Box/Box";
import {useSelector} from "react-redux";
import {RootState} from "../../modules";

function Board(){
    //TODO: 여기서 data axios 받아오고, redux로 정보넣기
    const menu = useSelector((state:RootState)=>state.menu.selected);
    return (
        <div className="board">
            {menu === 'calendar' ?
                <>
                    <CreateForm/>
                    <div className="boxes">
                        <Box title="오늘" selected={menu}/>
                        <Box title="예정" selected={menu}/>
                    </div>
                </>
                :
                <>
                    <div className="boxes">
                        <Box title="완료한 일정" selected={menu}/>
                    </div>
                </>
            }
        </div>
    )
}
export default Board;