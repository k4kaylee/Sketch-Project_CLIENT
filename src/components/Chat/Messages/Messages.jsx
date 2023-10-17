import React, { useCallback, useContext, useMemo, useState, useEffect } from 'react';
import styles from './Messages.module.css';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useModal } from '../../hooks/useModal';
import Notice from '../../misc/Notice/Notice';
import useChatUpdater from '../../hooks/useChatUpdater';



const Messages = ({ setIsInteractionTabVisible, 
                    setEmbeddedMessage, 
                    messages, 
                    currentChatId, 
                    setChats, 
                    messageInputRef, 
                    setIsEditing,
                    socket }) => {

  /* Context */
  const { user } = useContext(AuthContext);

  /* States */
  const [notification, setNotification] = useState('');

  /* Custom hooks */
  const { setContextMenu } = useContextMenu();
  const { setModal } = useModal();
  const { deleteMessage, editMessage } = useChatUpdater();

  useEffect(() => {
    return () => {
      setNotification('');
    };
  }, []);

  /* Custom functions */
  const hideMessage = (message) => {
    const messageElement = document.getElementById(message.id);
    if (messageElement) {
      messageElement.classList.add(`${styles.message_fade_away}`);
    }
  }

  const copyMessageToClipboard = (message) => {
    navigator.clipboard.writeText(message.content)
      .then(() => {
        setNotification('Message was copied to clipboard');
      }).then(() => {
        setTimeout(() => {
          setNotification('');
        }, 2000)
      })
      .catch((error) => {
        setNotification('Failed to copy text:', error);
      });
  }

  /* Context Menu */
  const contextMenu = useMemo(() => [
    {
      name: 'Edit',
      onClick: (message) => {
        editMessage(message);
        setIsInteractionTabVisible(true);
        setEmbeddedMessage({
          icon: 'edit',
          title: 'Editing message',
          content: message.content,
        });
        messageInputRef.current.value = message.content;
        messageInputRef.current.focus();
        setIsEditing(true);
      }
    },
    {
      name: 'Response',
      onClick: (message) => {}
    },
    {
      name: 'Delete',
      onClick: (message) => {
        setModal({
          header: 'Delete message',
          content: 'It will not be possible to restore this message. Are you sure?',
          onSubmit: () => {
            hideMessage(message);
            setTimeout(() => {
              deleteMessage(currentChatId, message, setChats);
            }, 400);
            // socket.emit()
          }

        });
      }
    },
    {
      name: 'Copy the text',
      onClick: (message) => copyMessageToClipboard(message)
    },
    {
      name: 'Select',
      onClick: (message) => {}
    }
  ], [setModal, hideMessage]);

  const handleContextMenu = useCallback((event, message) => {
    event.preventDefault();

    const { clientX, clientY } = event
    setContextMenu(contextMenu, [clientX, clientY], message)
  }, [setContextMenu, contextMenu])

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getHours()}:${minutes}`;
  }




  return (
    messages && messages.length !== 0 ? (
      <>
        <div className={styles.chat_messages}>
          <Notice content={notification} />
          <ul>
            {
              messages.map((message, index) => (
                <li className={user.id === message.author.id ? `${styles.message} ${styles.byMe}` : `${styles.message}`}
                  key={index}
                  id={message.id}
                  onContextMenu={(event) => handleContextMenu(event, message)}
                >
                  {message.content}
                  <div className={`${styles.timestamp} ${styles.unselectable}`}>
                    <span>{formatTimestamp(message.time)}</span>
                  </div>

                </li>
              ))
            }
          </ul>

        </div>
      </>

    ) : (
      <p className={`${styles.no_messages_info} ${styles.unselectable}`}><i>There is no messages yet. Send your first!</i></p>
    )
  )
}


export default Messages;
