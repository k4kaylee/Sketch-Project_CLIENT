import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import AuthContext from './context/AuthContext';
import Cookies from 'js-cookie';



const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const savedAuth = Cookies.get("isAuth");
    if (savedAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  return(
    <AuthContext.Provider value={{isAuth, setIsAuth}}>
      <BrowserRouter basename="/Sketch-Project_CLIENT">
        <AppRoutes/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;