import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './components/AppRoutes';
import Navbar from './components/NavBar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/Sketch-Project_CLIENT"  >   
    <Navbar/>
    <AppRoutes/>
  </BrowserRouter>
);


reportWebVitals();
