import '../App.css';
import Navbar from '../components/NavBar';
import React from 'react';
import Waves from '../components/misc/Waves';
import LoginForm from '../components/Login/LoginForm/LoginForm'





const Login = () => {
  return (
    <div className="login-container">
      <Navbar />
      <div className='content'>
        <div className='flex'>
          <header>
            <p className='head-text unselectable' style={{ animationFillMode: "forwards" }}>Let's chat in Real Time!</p>
            <p className='head-subtext unselectable'>...and collaborate in the moment.</p>
          </header>
          <LoginForm />
        </div>
      </div>


      <Waves type='landing' />
    </div>
  );
}

export default Login;

