import React, { useState, useEffect } from 'react';
import axios from '../api/axios.js';

const Users = () => {
  const [users, setUsers] = useState(['Roma', '618247184', 'roma@mail.com']);


  return (
    <>
      <h2 className="head-text" style={{marginLeft: "100px"}}>User list:</h2>
      <ul>
        {users.length ? (
          users.map((user, i) => <li key={i} style={{color: "azure", marginLeft: "150px"}}>{user.username}</li>)
        ) : (
          <li style={{color: "azure", marginLeft: "150px"}}>User list is empty</li>
        )}
      </ul>
    </>
  );
};

export default Users;