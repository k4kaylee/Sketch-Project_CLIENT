import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import styles from './ChatInput.module.css';

const ChatInput = ({ messageInputRef, setMessages, messages, setPendingMessage }) => {
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message !== null) {
      sendMessage();
    }
  }

  const sendMessage = async () => {
    if (message !== '') {
      const newMessages = [...messages];

      newMessages.push(
        {
          author: user.id,
          content: message,
          time: new Date().toLocaleString()
        }
      )

      setMessages(newMessages);
      setPendingMessage(message);
      messageInputRef.current.value = '';
      setMessage('');
    }
  }

  return (
    <div className={styles.chat_input}>
      <input ref={messageInputRef}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={message ? `${styles.send_button} ${styles.__active}` : `${styles.send_button} ${styles.__inactive}`}
        onClick={sendMessage}
      >
        <div className={message ? `${styles.send_img} ${styles.__active}` : `${styles.send_img} ${styles.__inactive}`} />
      </button>
    </div>
  )
}

export default ChatInput;
