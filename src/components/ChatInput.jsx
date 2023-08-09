import React, { useRef, useState } from 'react';

const ChatInput = ({ messageInputRef }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {

  }

  return (
    <div className='chat-input'>
        <input ref={messageInputRef} placeholder='Message...' onChange={(e) => setMessage(e.target.value)} />
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
