import React, { useRef, useState, useEffect } from 'react';
import styles from './RegistrationForm.module.css'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from '../../../api/axios';


const RegistrationForm = () => {
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
        <div className={`${styles.registration_container}`}>
            <form className={`${styles.registration}`}>
                {success ? (
                    <section>
                        <p className={`${styles.regText} ${styles.unselectable}`}>Success!</p>
                        <p className={`${styles.sign_in_link}`}>
                            Now, let's <Link to='/'>sign you in</Link>
                        </p>
                    </section>
                ) : (
                    <>
                        <p className={`${styles.headText} ${styles.unselectable}`}>Let's get to know each other better!</p>
                        <p ref={errRef}
                            className={errMsg ? `${styles.errmsg}` : `${styles.offscreen}`}
                            aria-live="assertive">
                            {errMsg}
                        </p>


                        {/* Login */}

                        <span className={validName ? `${styles.valid}` : `${styles.hide}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? `${styles.hide}` : `${styles.invalid}`}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>

                        <input
                            className={`${styles.registration_input}`}
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

                        <p id="uidnote" className={userFocus && user && !validName ? `${styles.instructions}` : `${styles.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        {/* Password */}

                        <span className={validPwd ? `${styles.valid}` : `${styles.hide}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? `${styles.hide}` : `${styles.invalid}`}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>

                        <input
                            className={`${styles.registration_input}`}
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

                        <p id="pwdnote" className={pwdFocus && !validPwd ? `${styles.instructions}` : `${styles.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase latin letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>



                        {/*Repeat password */}

                        <span className={validMatch && pwd ? `${styles.valid}` : `${styles.hide}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !pwd ? `${styles.hide}` : `${styles.invalid}`}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>

                        <input
                            className={`${styles.registration_input}`}
                            type="password"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            placeholder="Repeat password"
                            required
                        />


                        {/* E-mail */}

                        <span className={validEmail ? `${styles.valid}` : `${styles.hide}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !email ? `${styles.hide}` : `${styles.invalid}`}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>

                        <input
                            className={`${styles.registration_input}`}
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

                        <p id="emailnote" className={emailFocus && !validEmail ? `${styles.instructions}` : `${styles.offscreen}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Please, make sure that it is accessible and working.
                        </p>






                        <div className={`${styles.button_container}`}>
                            <Link className={`${styles.c_button} ${styles.c_button__gooey} ${styles.unselectable}`} to='/'> Log in
                                <div className={`${styles.c_button__blobs}`}>
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
                                className={validName && validPwd && validMatch && validEmail ?
                                    `${styles.c_button} ${styles.c_button__gooey} ${styles.register} ${styles.unselectable}`
                                    :
                                    `${styles.c_button} ${styles.c_button__gooey} ${styles.disabled} ${styles.unselectable}`}
                                id={`${styles.register_btn}`}
                                onClick={registerUser}
                            >
                                Register
                                <div className={`${styles.c_button__blobs}`}>
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
        </div>
    )
}

export default RegistrationForm;