import React from 'react';
import './Main.scss';
import SideMenu from "../../Components/SideMenu/SideMenu";
import Board from "../../Components/Board/Board";

function Main (){
    return (
        <div className="main">
            <SideMenu/>
            <Board/>
        </div>
    )
}

export default Main;