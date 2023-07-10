import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const loadUsers = async() =>{
      try{
        const response = await axios.get('/users');
        if(response.status === 200){
          setUsers(response.data);
        }
      }catch(error){
        alert("error");
        console.log(error.message);
      }
    }

    loadUsers();
  }, [])


  return (
    <>
      <h2 className="head-text" style={{marginLeft: "100px"}}>User list:</h2>
        <table style={{color: "azure", marginLeft: "150px"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user, i) => (
                <tr key={i}>
                  <td style={{padding: "0 30px"}}>{user.name}</td>
                  <td style={{padding: "0 30px"}}>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{color: "azure"}}>User list is empty</td>
              </tr>
            )}
          </tbody>
        </table>
    </>
  );
};

export default Users;