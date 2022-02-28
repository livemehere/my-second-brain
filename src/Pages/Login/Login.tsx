import React from 'react';
import './Login.scss';
import {useNavigate} from 'react-router-dom';

function Login (){
    const navigate  = useNavigate();
    const handleSubmit = ()=>{
        navigate('/main')
    }
    return (
        <div className="login">
            <form className="login-box" onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <input type="text" placeholder="이메일"/>
                <input type="password" placeholder="비밀번호"/>
                <button>로그인</button>
            </form>
        </div>
    )
}

export default  Login;