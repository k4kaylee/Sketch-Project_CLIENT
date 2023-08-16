import '../App.css';
import Navbar from '../components/NavBar';
import { Link } from "react-router-dom";
import React, {useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import Waves from '../components/misc/Waves';





const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');



  return (
    <div className="App">
      <Navbar/>
        <div className='content'>
          <div className='flex'>
            <header>
              <p className='head-text unselectable' style={{animationFillMode: "forwards"}}>Let's check the font!</p>
              <p className='head-subtext unselectable'>...and header subtext font</p>
            </header>
            <section className="login">
                <p className="unselectable">Are we familliar?</p>
                <div className="input-group">
                  <input required="" 
                         type="text" 
                         name="text" 
                         onChange={(e) => setName(e.target.value)}
                         autoComplete="off" 
                         className="log-input"/>
                  <label className="user-label">Login</label>
                </div>
                <form className="input-group">
                  <input required="" 
                         type="password" 
                         name="text" 
                         autoComplete="off" 
                         onChange={(e) => setPwd(e.target.value)}
                         className="log-input"/>
                  <label className="user-label">Password</label>
                </form>


        <div>
                <button id="login-button"  className="c-button c-button--gooey" onClick={() => handleLogin(name, pwd)}> Log in
                <div className="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              <svg style={{display: "block", height: 0, width: 0}} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                    <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
                    <feBlend in2="goo" in="SourceGraphic"></feBlend>
                  </filter>
                </defs>
              </svg>
              </button>

              <p className="registration-link">First time? <Link to='/registration'>Sign up!</Link></p>
              </div>
            </section>
          </div>
        </div>

        
        <Waves styles='waves'/>
    </div>
  );
}

export default Login;

