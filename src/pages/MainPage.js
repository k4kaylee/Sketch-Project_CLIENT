import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import '../App.css';
import Cookies from 'js-cookie';



const MainPage = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const handleLogout = () => {
        setIsAuth(false);
        Cookies.remove("isAuth");
    }


    return(
       <>
        <p className="head-text">Main Page</p>
        <p className="head-subtext">If you see this page, you are logged in!</p>
        <a onClick={handleLogout} style={{color: "#e34c67"}}>Log out</a>
       </>
    )
}

export default MainPage;