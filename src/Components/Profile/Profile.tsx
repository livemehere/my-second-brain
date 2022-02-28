import avatar from "../../Assets/Images/avatar.jpg";
import React from "react";

function Profile(){
    return (
        <div className="profile">
            <div className="avatar">
                <img src={avatar} alt=""/>
            </div>
            <h3 className="name">공태민 님</h3>
        </div>
    )
}

export default Profile;