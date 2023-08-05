import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Users from '../components/Users.js';
import MainPage from '../pages/MainPage.js';
import Chat from '../pages/Chat.js';



const AppRoutes = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    return(
        isAuth ? (
        <Routes>
            <Route path="/users" element={<Users/>}/>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/chat" element={<Chat/>}/>
        </Routes>
        ) : (
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route exact path="/registration" element={<Register/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
        )
    )   
};

export default AppRoutes;