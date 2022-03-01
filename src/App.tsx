import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Main from "./Pages/Main/Main";
import SignUp from "./Pages/SignUp/SignUp";



function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/main" element={<Main/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
