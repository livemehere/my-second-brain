import React, {FormEvent, useEffect, useState} from 'react';
import './Login.scss';
import {useNavigate} from 'react-router-dom';
import {FirebaseGetCurrentLoginedUser, FirebaseLogin, observeLoginState} from "../../Services/Firebase";

function Login (){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate  = useNavigate();
    const handleSubmit = (e:FormEvent)=>{
        // navigate('/main')
        e.preventDefault();
        FirebaseLogin(email,password);
    }
    const goToSignUp = (e:FormEvent)=>{
        e.preventDefault();
        navigate('/signup');
    }
    const goToMain = ()=>{
        navigate('/main');
    }
    const goToLogin = ()=>{
        navigate('/');
    }
    useEffect(()=>{
        observeLoginState(goToMain,goToLogin);
    },[])

    return (
        <div className="login">
            <form className="login-box" >
                <h1>로그인</h1>
                <input type="text" placeholder="이메일" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="비밀번호" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleSubmit}>로그인</button>
                <button onClick={goToSignUp}>회원가입</button>
            </form>
        </div>
    )
}

export default  Login;