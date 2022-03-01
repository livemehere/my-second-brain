import React, {FormEvent, useState} from "react";
import {FirebaseSingUp} from "../../Services/Firebase";

function SignUp(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSignUp = (e:FormEvent)=>{
        e.preventDefault();
        FirebaseSingUp(email,password);
    }
    return (
        <div className="login">
            <form className="login-box" >
                <h1>회원가입</h1>
                <input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleSignUp}>회원가입</button>
            </form>
        </div>
    )
}

export default SignUp;