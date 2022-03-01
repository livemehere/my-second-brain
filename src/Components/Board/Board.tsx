import React, {useEffect, useState} from "react";
import CreateForm from "../CreateForm/CreateForm";
import Box from "../Box/Box";
import {useSelector} from "react-redux";
import {RootState} from "../../modules";
import {ItemType} from "../../modules/Item";
import DateChecker from "../../Utils/checkDay";

function Board(){
    //TODO: 여기서 data axios 받아오고, redux로 정보넣기
    const menu = useSelector((state:RootState)=>state.menu.selected);
    const data:ItemType[] = useSelector((state:RootState)=>state.item);
    const [todayItem,setTodayItem] = useState<ItemType[]>([])
    const [upCommingItem,setUpCommingItem] = useState<ItemType[]>([])
    const [completeItem,setCompleteItem] = useState<ItemType[]>([])



    useEffect(()=>{
        //TODO: 필터링
        // 1. complete가 true 인 경우 완료된 일정으로 분류
        // 2. startDate 가 new Date() 와 다른데 차이나는 경우 "예정"으로 분류
        // 3. startDate 가 new Date() 와 같을 경우 "오늘"로 분류
        setCompleteItem([]);
        setTodayItem([]);
        setUpCommingItem([]);
        data.forEach(item=>{
            if(item.complete){
                //이미 완료한 일이라면
                setCompleteItem(prev=>([...prev,item]));
            }else{
                // 이미 완료한 일이 아니고
                if(DateChecker.isToday(item.startDate)){
                //오늘이면
                    setTodayItem(prev=>([...prev,item]));
                }else{
                    //오늘이 아니면
                    setUpCommingItem(prev=>([...prev,item]));
                }
            }
        })
    },[data]);

    return (
        <div className="board">
            {menu === 'calendar' ?
                <>
                    <CreateForm/>
                    <div className="boxes">
                        <Box title="오늘" selected={menu} data={todayItem}/>
                        <Box title="예정" selected={menu} data={upCommingItem}/>
                    </div>
                </>
                :
                <>
                    <div className="boxes">
                        <Box title="완료한 일정" selected={menu} data={completeItem}/>
                    </div>
                </>
            }
        </div>
    )
}
export default Board;