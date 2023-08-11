import React, { useRef, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

const ChatInput = ({ messageInputRef, setMessages, messages }) => {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' && message !== null){
      sendMessage();
    }
  }

  const sendMessage = () => {
    const newMessages = [...messages];

    newMessages.push(
      {
        author: user,
        content: message,
        time: new Date().toLocaleString()
      }
    )

    setMessages(newMessages);
    messageInputRef.current.value = '';
  }

  return (
    <div className='chat-input'>
        <input ref={messageInputRef} 
               placeholder='Message...' 
               onChange={(e) => setMessage(e.target.value)} 
               onKeyDown={ handleKeyDown }
        />
        <button
                className={message ? 'send-button __active' : 'send-button __inactive'}
                onClick={sendMessage}
        >
           <div className={message ? 'send-img __active' : 'send-img __inactive'} />
        </button>
    </div>
  )
}

export default ChatInput;
