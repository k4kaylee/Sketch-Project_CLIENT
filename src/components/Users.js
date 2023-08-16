import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  
  const loadUsers = async() =>{
    try{
      const response = await axios.get('/users');
      if(response.status === 200){
        setUsers(response.data);
      }
    }catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [users])

  const removeUser = async(user) =>{
    
    try{
      const response = await axios.delete('/users', {data: {name: user.name, email: user.email}});
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <>
      <h2 className="users-lable">User list:</h2>
        <table className="users-table">
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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={(user.name === "admin") ? "offscreen" : "remove-user"} 
                      onClick={() => removeUser(user)} 
                      key={i}
                      > X </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">User list is empty</td>
              </tr>
            )}
          </tbody>
        </table>
    </>
  );
};

export default Users;