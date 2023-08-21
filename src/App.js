import React from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/AppRoutes';
import { AuthProvider } from './context/AuthContext';



const App = () => {
  return(
    <AuthProvider>
        <BrowserRouter basename="/Sketch-Project_CLIENT">
          <AppRoutes/>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App;