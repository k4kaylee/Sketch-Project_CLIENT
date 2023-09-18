import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import Login from '../pages/Login.js';
import Register from '../pages/Register.js';
import Chat from '../pages/Chat/Chat.js';



const AppRoutes = () => {
    const {isAuth} = useContext(AuthContext);

    return(
        isAuth ? (
            <Routes>
              <Route path='/' element={<Chat/>}/>
              <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
          ) : (
            <Routes>
              <Route path='/' element={<Login />}/>
              <Route exact path='/registration' element={<Register/>}/>
              <Route path='*' element={<Navigate to='/'/>}/>
            </Routes>
          )
          
    )   
};

export default AppRoutes;