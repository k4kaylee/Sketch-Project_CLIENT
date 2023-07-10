import React from 'react';
import {Routes, Route} from 'react-router-dom';
import App from '../App.js';
import Register from '../pages/Register.js';
import Users from '../components/Users.js';

const AppRoutes = () => {
    return(
        <Routes>

            <Route path="/" element={<App />}/>
            <Route exact path="/registration" element={<Register/>}/>
            <Route path="/users" element={<Users/>}/>
        </Routes>
    )   
};

export default AppRoutes;