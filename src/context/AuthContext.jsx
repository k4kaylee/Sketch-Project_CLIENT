import React, { createContext, useState, useEffect } from "react";
import axios from '../api/axios.js';
import Cookies from 'js-cookie';


const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuth, setIsAuth] = useState(false);



  useEffect(() => {
    const savedAuth = Cookies.get("isAuth");
    if (savedAuth === "true") {
      setIsAuth(true);
    }
    const cookie = Cookies.get("user");
    const userFromCookies = JSON.parse(cookie);
    setUser(userFromCookies);
  }, []);



  const handleLogin = async (name, password) => {
    const user = { name: name, password: password };

    try {
      const response = await axios.get('/login', { params: user });
      const userData = response.data;

      Cookies.set("isAuth", true, { expires: 7 });
      if (response.status === 200) {
        setUser({ id: userData.id, name: userData.name });
        setIsAuth(true);
        Cookies.set("isAuth", true, { expires: 7 });
        Cookies.set("user", JSON.stringify(userData), { expires: 3 });
      }
    } catch (error) {
      alert("error");
      Cookies.remove("isAuth");
      Cookies.remove("user");
      console.log(error.message);
    }
  }



  const handleLogout = () => {
    setIsAuth(false);
    Cookies.remove("isAuth");
  }



  return (
    <AuthContext.Provider value={{ isAuth, user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthContext, AuthProvider };