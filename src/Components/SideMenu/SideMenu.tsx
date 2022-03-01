import avatar from "../../Assets/Images/avatar.jpg";
import React from "react";
import Profile from "../Profile/Profile";
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
import {FirebaseSignOut} from "../../Services/Firebase";

function SideMenu(){
    const navigate = useNavigate();
    const handleLogout = ()=>{
        // navigate('/');
        FirebaseSignOut();
    }
    return (
        <div className="side-menu">
            <Profile/>
            <div className="divider"/>
            <Menu/>
            <button className="logout" onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default SideMenu;