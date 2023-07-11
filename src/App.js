import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import Navbar from './components/NavBar';
import AuthContext from './context/AuthContext';

const App = () => {
  return(
    <AuthContext.Provider value={{}}>
      <BrowserRouter basename="/Sketch-Project_CLIENT">
        <Navbar/>
        <AppRoutes/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;