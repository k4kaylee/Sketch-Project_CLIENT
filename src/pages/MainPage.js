import React, {useContext} from 'react';
import { AuthContext }  from '../context/AuthContext';
import '../App.css';
import { Link } from 'react-router-dom';



const MainPage = () => {
    const { handleLogout } = useContext(AuthContext);


    return(
       <div className="content">
        <p className="head-text">Main Page</p>
        <p className="head-subtext">If you see this page, you are logged in!</p>
        <div style={{color: "#e34c67", width: "350px", display:"flex", alignContent: "space-between"}}>
            <a onClick={handleLogout}>Log out</a>
            <Link to='/chat' style={{marginLeft: "auto"}}>Go to chat</Link>
        </div>
       </div>
    )
}

export default MainPage;