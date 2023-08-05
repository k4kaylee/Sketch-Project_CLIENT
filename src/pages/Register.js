import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/NavBar';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from '../api/axios.js';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
//[a-zA-Z] - must start with a lower or upper-case letter
//[a-zA-Z0-9-_] - includes lower or upper-case letters, numbers, underscores
//{3,23}$ - must contain from 3 to 23 symbols

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
/*Must contain
  (?=.*[a-z]) - lower-case letters
  (?=.*[A-Z]) - upper-case letters
  (?=.*[0-9]) - numbers
  (?=.*[!@#$%]) - symbols that are mentioned in []
  {8,24}$ - from 8 to 24 symbols
*/

const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const REGISTER_URL = '/users';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [userFocus, setUserFocus] = useState(false);
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])



  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
    setValidPwd(result);
  }, [pwd, matchPwd])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])


  //Handling register button
  const registerUser = async () => {

    //double check!
    const userAdditionalValidation = USER_REGEX.test(user);
    const passwordAdditionalValidation = PWD_REGEX.test(pwd);
    if (!userAdditionalValidation || !passwordAdditionalValidation) {
      setErrMsg("Invalid entry");
      return;
    }

    const newUser = {
      name: user,
      password: pwd,
      email: email
    };

    try {
      const response = await axios.post(REGISTER_URL, newUser);
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          setErrMsg("Provided data is insufficient.");
          break;
        case 401:
          setErrMsg("Provided email is already taken.");
          break;
        case 500:
          setErrMsg("Internal server error. Please, try again later.");
          break;
        default:
          break;
      }
    }

  };


  return (
    <>
      <Navbar/>
      <form className='registration'>
        {success ? (
          <section>
            <p className="regText unselectable" style={{ fontSize: "40px" }}>Success!</p>
            <p className="sign-in-link">
              Now, let's <Link to='/'>sign you in</Link>
            </p>
          </section>
        ) : (
          <>
            <p className="regText unselectable">Let's get to know each other better!</p>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>


            {/* Login */}

            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

            <input
              className="registration-input"
              type="text"
              id="login_input"
              ref={userRef}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Login" />

            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              3 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>



            {/* Password */}

            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

            <input
              className="registration-input inputID"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Password"
            />

            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase latin letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>



            {/*Repeat password */}

            <span className={validMatch && pwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMatch || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

            <input
              className="registration-input inputID"
              type="password"
              onChange={(e) => setMatchPwd(e.target.value)}
              placeholder="Repeat password"
              required
            />


            {/* E-mail */}

            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>

            <input
              className="registration-input inputID"
              type="email"
              id="email_input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              required
            />

            <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Please, make sure that it is accessible and working.
            </p>






            <div className="button-container">
              <Link className="c-button c-button--gooey unselectable" to='/'> Log in
                <div className="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <svg style={{ display: "block", height: 0, width: 0 }} version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="goo">
                      <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                      <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic"></feBlend>
                    </filter>
                  </defs>
                </svg>
              </Link>




              <a
                disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}
                className={validName && validPwd && validMatch && validEmail ? "c-button c-button--gooey register unselectable" : "c-button c-button--gooey register disabled unselectable"}
                id="register_btn"
                onClick={registerUser}
              >
                Register
                <div className="c-button__blobs">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </a>
              
              <svg style={{ display: "block", height: 0, width: 0 }} version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur result="blur" stdDeviation="10" in="SourceGraphic"></feGaussianBlur>
                    <feColorMatrix result="goo" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" mode="matrix" in="blur"></feColorMatrix>
                    <feBlend in2="goo" in="SourceGraphic"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
          </>
        )
        }

      </form>
    </>
  )
};






export default Register;