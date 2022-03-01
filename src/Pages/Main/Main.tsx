import React, {useEffect} from 'react';
import './Main.scss';
import SideMenu from "../../Components/SideMenu/SideMenu";
import Board from "../../Components/Board/Board";
import {FirebaseGetCurrentLoginedUser, getAllCalendarItems} from "../../Services/Firebase";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {add, load} from "../../modules/Item";

function Main (){
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        //URL 주소창으로 main 입력ㅎ서 들어오면 강제로 로그인화면으로 보내버림
        if(!FirebaseGetCurrentLoginedUser()){
            navigate('/');
        }
    },[])

    useEffect(()=>{
        (async ()=>{
            const loadedItems = await getAllCalendarItems();
            dispatch(load(loadedItems));
        })()
    },[])
    return (
        <div className="main">
            <SideMenu/>
            <Board/>
        </div>
    )
}

export default Main;