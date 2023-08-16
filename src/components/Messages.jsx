import React, { useContext } from 'react';
import '../App.css';
import { AuthContext } from '../context/AuthContext';


const Messages = (props) => {
  const { user } = useContext(AuthContext);
  const messages = props.messages;

  return (
    <div className='chat-messages'>
        <ul>
          {
            messages.map((message, index) => (
              <li className={user.id === message.author ? 'message byMe' : 'message'} key={index}>{message.content}</li>
            ))  
          }
        </ul>
    </div>
  )
}


export default Messages;
