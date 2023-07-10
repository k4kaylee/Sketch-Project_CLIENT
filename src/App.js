import './App.css';
import { Link } from "react-router-dom";
import {useState} from "react";
import axios from './api/axios.js'



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async() => {
    const user = {name: name, password: pwd};

    try{
      const response = await axios.get('/login', {params: user});
      if(response.status === 200){
        alert("SUCCESS!");
        setLoggedIn(true);
      }
    }catch(error){
      alert("error");
      console.log(error.message);
    }
  }

  return (
    <div className="App">
        <div className='content'>
          <div className='flex'>
            <div>
              <p className='head-text unselectable' style={{animationFillMode: "forwards"}}>Let's check the font!</p>
              <p className='head-subtext unselectable'>...and header subtext font</p>
            </div>
            <div className="login">
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
                <div className="input-group">
                  <input required="" 
                         type="password" 
                         name="text" 
                         autoComplete="off" 
                         onChange={(e) => setPwd(e.target.value)}
                         className="log-input"/>
                  <label className="user-label">Password</label>
                </div>


        <div>
                <button id="login-button"  className="c-button c-button--gooey" onClick={handleLogin}> Log in
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
            </div>
          </div>
        </div>

        
        <svg className="waves" id="visual" viewBox="0 0 1600 400" width="1600" height="400">
          <path d="M0 145L33.3 140.5C66.7 136 133.3 127 200 113.8C266.7 100.7 333.3 83.3 400 74C466.7 64.7 533.3 63.3 600 77.8C666.7 92.3 733.3 122.7 800 128C866.7 133.3 933.3 113.7 1000 104.7C1066.7 95.7 1133.3 97.3 1200 97.7C1266.7 98 1333.3 97 1400 102C1466.7 107 1533.3 118 1566.7 123.5L1600 129L1600 401L1566.7 401C1533.3 401 1466.7 401 1400 401C1333.3 401 1266.7 401 1200 401C1133.3 401 1066.7 401 1000 401C933.3 401 866.7 401 800 401C733.3 401 666.7 401 600 401C533.3 401 466.7 401 400 401C333.3 401 266.7 401 200 401C133.3 401 66.7 401 33.3 401L0 401Z" fill="#fa7268" className='wave1'></path>
          <path d="M0 200L33.3 188.3C66.7 176.7 133.3 153.3 200 149C266.7 144.7 333.3 159.3 400 164C466.7 168.7 533.3 163.3 600 163.5C666.7 163.7 733.3 169.3 800 167.2C866.7 165 933.3 155 1000 152.3C1066.7 149.7 1133.3 154.3 1200 157.7C1266.7 161 1333.3 163 1400 172.8C1466.7 182.7 1533.3 200.3 1566.7 209.2L1600 218L1600 401L1566.7 401C1533.3 401 1466.7 401 1400 401C1333.3 401 1266.7 401 1200 401C1133.3 401 1066.7 401 1000 401C933.3 401 866.7 401 800 401C733.3 401 666.7 401 600 401C533.3 401 466.7 401 400 401C333.3 401 266.7 401 200 401C133.3 401 66.7 401 33.3 401L0 401Z" fill="#eb5967" className='wave2'></path>
          <path d="M -1 308 L 33.3 283.8 C 114 230 172 241 190 241 C 261 249 264 274 344 265 C 492 243 507 254 595 252 C 690 243 694 217 800 228.2 C 866.7 238.3 933.3 262.7 1000 275.2 c 66.7 12.5 114 -20.2 175 -45.2 c 43 -18 117 -3 208 25 C 1504 284 1502 272 1562 252 L 1600 242 L 1600 401 L 1566.7 401 C 1533.3 401 1466.7 401 1400 401 C 1333.3 401 1266.7 401 1200 401 C 1133.3 401 1066.7 401 1000 401 C 933.3 401 866.7 401 800 401 C 733.3 401 666.7 401 600 401 C 533.3 401 466.7 401 400 401 C 333.3 401 266.7 401 200 401 C 133.3 401 66.7 401 33.3 401 L 0 401 Z" fill="#da3f67" className='wave3'></path>
          <path d="M0 322L33.3 329.2C66.7 336.3 133.3 350.7 200 352C266.7 353.3 333.3 341.7 400 338.7C466.7 335.7 533.3 341.3 600 334C666.7 326.7 733.3 306.3 800 304.5C866.7 302.7 933.3 319.3 1000 331.5C1066.7 343.7 1133.3 351.3 1200 349.8C1266.7 348.3 1333.3 337.7 1400 333.2C1466.7 328.7 1533.3 330.3 1566.7 331.2L1600 332L1600 401L1566.7 401C1533.3 401 1466.7 401 1400 401C1333.3 401 1266.7 401 1200 401C1133.3 401 1066.7 401 1000 401C933.3 401 866.7 401 800 401C733.3 401 666.7 401 600 401C533.3 401 466.7 401 400 401C333.3 401 266.7 401 200 401C133.3 401 66.7 401 33.3 401L0 401Z" fill="#c62368" className='wave4'>
          </path>
        </svg>
    </div>
  );
}

export default App;
export { loggedIn };
