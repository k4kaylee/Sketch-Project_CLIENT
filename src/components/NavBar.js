import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../App.css';
import { Link } from "react-router-dom";

const Navbar = () =>{
  const {isAuth} = useContext(AuthContext);

    return(
        <div className='header'>
          <div className='logo centered'/>
          <Link to="/users" className={isAuth ? "users-tab" : "offscreen"}>Users</Link>  {/*to be styled*/}
        </div>
    )
}

export default Navbar;