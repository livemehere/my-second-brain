import avatar from "../../Assets/Images/avatar.jpg";
import React, {useEffect, useState} from "react";
import {FirebaseGetCurrentLoginedUser} from "../../Services/Firebase";

function Profile(){
    const [displayName,setDisplayName]=useState<string | null | undefined>(null);
    const [photoURL,setPhotoURL]=useState<string | null | undefined>(null);
    useEffect(()=>{
        const user = FirebaseGetCurrentLoginedUser();
        setDisplayName(user?.displayName);
        setPhotoURL(user?.photoURL)
    },[])

    return (
        <div className="profile">
            <div className="avatar">
                <img src={photoURL? avatar : avatar} alt=""/>
            </div>
            <h3 className="name">{displayName ? displayName : "익명"} 님</h3>
        </div>
    )
}

export default Profile;