import React from 'react'
import {Routes, Route} from 'react-router-dom'
import App from '../App.js'
import Register from '../pages/Register.js';

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<App />}/>
            <Route exact path="/registration" element={<Register/>}/>
        </Routes>
    )   
};

export default AppRoutes;