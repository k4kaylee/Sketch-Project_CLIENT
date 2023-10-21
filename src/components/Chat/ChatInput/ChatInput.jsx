import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext.jsx';
import styles from './ChatInput.module.css';
import InteractionTab from './InteractionTab/InteractionTab.jsx';
import useChatUpdater from '../../hooks/useChatUpdater.js';

const ChatInput = ({ embeddedMessage,
                     messageInputRef, 
                     setMessages, 
                     messages, 
                     currentChat, 
                     setPendingMessage, 
                     messageBeforeEdit,
                     setChats,
                     isEditing,
                     setIsEditing,
                     socket}) => {
                      
  /* To be restructured: too many props */

  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);
  const { editMessage } = useChatUpdater();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && message !== null) {
      isEditing ?
        handleEdit()
      :
        sendMessage();
    }
  }

  const sendMessage = async () => {
    if (message !== '') {
      const newMessages = [...messages];

      if(socket !== null) {
        const recipientId = currentChat.participants.find((participant) => participant.id !== user.id).id;
        socket.emit("sendMessage", {
            author: {
              name: user.name,
              id: user.id
            },
            content: message,
            time: new Date().toISOString(),
            recipientId: recipientId,
            chatId: currentChat.id
        })
      }
      
      newMessages.push(
        {
          author: {
            name: user.name,
            id: user.id
          },
          content: message,
          time: new Date().toISOString()
        }
      )

      setMessages(newMessages);
      setPendingMessage(message);
      messageInputRef.current.value = '';
      setMessage('');
    }
  }

  const handleEdit = () => {
    const editedMessage = messageInputRef.current.value
     if(editedMessage !== '' && editedMessage !== messageBeforeEdit){
      editMessage({
        id: embeddedMessage.content.id, 
        message: editedMessage
      }, currentChat.id, setChats);
     }
    setIsEditing(false);
    messageInputRef.current.value = '';
  }


  return (
    <div className={styles.container}>
      <InteractionTab embeddedMessage={embeddedMessage}
                      messageInputRef={messageInputRef}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}/>
      <div className={styles.chat_input}>
        <input ref={messageInputRef}
          placeholder='Message...'
          onChange={(e) => {
            if(!isEditing)
              setMessage(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        {isEditing? 
          <button className={styles.accept_button} onClick={() => handleEdit()}>
            <div className={styles.accept_img}></div>
          </button>
          :
          <button
            className={message ? `${styles.send_button} ${styles.__active}` : `${styles.send_button} ${styles.__inactive}`}
            onClick={sendMessage}
          >
            <div className={message ? `${styles.send_img} ${styles.__active}` : `${styles.send_img} ${styles.__inactive}`} />
          </button>
        }
      </div>
    </div>
  )
}

export default ChatInput;
