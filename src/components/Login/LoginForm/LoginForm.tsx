import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from "./../../../context/AuthContext";
import styles from "./LoginForm.module.css"



const LoginForm = () => {
    // @ts-ignore
    const { handleLogin } = useContext(AuthContext);

    /* States */
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin(name, pwd);
        }
    }

    return (
        <section className={`${styles.login}`} onKeyDown={handleKeyDown}>
            <p className={`${styles.unselectable}`}>Are we familliar?</p>
            <div className={`${styles.input_group}`}>
                <input
                    type="text"
                    name="login"
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    className={`${styles.log_input}`} />
                <label className={`${styles.user_label}`}>Login</label>
            </div>
            <form className={`${styles.input_group}`}>
                <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    className={`${styles.log_input}`} />
                <label className={`${styles.user_label}`}>Password</label>
            </form>


            <div>
                <button id={`${styles.login_button}`} className={`${styles.c_button} ${styles.c_button__gooey}`} onClick={() => handleLogin(name, pwd)}> Log in
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
                </button>

                <p className={`${styles.registration_link}`}>First time? <Link to='/registration'>Sign up!</Link></p>
            </div>
        </section>
    )
}

export default LoginForm;