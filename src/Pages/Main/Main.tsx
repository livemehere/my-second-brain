import React, {useEffect} from 'react';
import './Main.scss';
import SideMenu from "../../Components/SideMenu/SideMenu";
import Board from "../../Components/Board/Board";
import {FirebaseGetCurrentLoginedUser} from "../../Services/Firebase";
import {useNavigate} from "react-router-dom";

function Main (){
    const navigate  = useNavigate();
    useEffect(()=>{
        //URL 주소창으로 main 입력ㅎ서 들어오면 강제로 로그인화면으로 보내버림
        if(!FirebaseGetCurrentLoginedUser()){
            navigate('/');
        }
    },[])
    return (
        <div className="main">
            <SideMenu/>
            <Board/>
        </div>
    )
}

export default Main;