import React from 'react';
import './Main.scss';
import avatar from '../../Assets/Images/avatar.jpg';
import SideMenu from "../../Components/SideMenu/SideMenu";

function Main (){
    return (
        <div className="main">
            <SideMenu/>
            <div className="board">board</div>
        </div>
    )
}

export default Main;