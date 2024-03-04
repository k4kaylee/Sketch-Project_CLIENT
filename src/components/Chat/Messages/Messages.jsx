import React, { useCallback, useContext, useState, useEffect } from 'react';
import styles from './Messages.module.css';
import { AuthContext } from '@/context/AuthContext.jsx';
import { useContextMenu } from '../../hooks/useContextMenu';
import { useModal } from '../../hooks/useModal';
import useChatUpdater from '../../hooks/useChatUpdater';



const Messages = ({
  setEmbeddedMessage,
  messages,
  currentChatId,
  setChats,
  messageInputRef,
  setMessageBeforeEdit,
  setIsEditing,
  setSelectedMessages,
  setNotification,
  socket,
  setIsInteractionTabVisible,
  children }) => {

  /* Context */
  const { user } = useContext(AuthContext);


  /* Custom hooks */
  const { setContextMenu } = useContextMenu();
  const { setModal } = useModal();
  const { deleteMessage } = useChatUpdater();

  useEffect(() => {
    return () => {
      setNotification('');
    };
  }, []);

  /* Custom functions */
  const MAX_RESPONSE_LENGTH = 16;

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

  const handleContextMenu = useCallback((event, message) => {
    event.preventDefault();

    const contextMenu = () => {
      const commonOptions = [
        {
          name: 'Response',
          onClick: (message) => {
            setEmbeddedMessage({
              icon: 'response',
              title: message.author.name,
              content: {
                id: message.id,
                message: message.content
              }
            });
            setIsInteractionTabVisible(true);
            messageInputRef.current.focus();
          }
        },
        {
          name: 'Copy the text',
          onClick: (message) => copyMessageToClipboard(message)
        },
        {
          name: 'Select',
          onClick: (message) => switchIsSelected(message)
        }]

      if (message.author.id === user.id)
        return ([
          {
            name: 'Edit',
            onClick: (message) => {
              setEmbeddedMessage({
                icon: 'edit',
                title: 'Editing message',
                content: {
                  id: message.id,
                  message: message.content,
                }
              });
              messageInputRef.current.value = message.content;
              messageInputRef.current.focus();
              setIsEditing(true);
              setMessageBeforeEdit(message.content)
            }
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
          ...commonOptions,
        ])
      else
        return (
          commonOptions
        )
    };


    const { clientX, clientY } = event
    setContextMenu(contextMenu, [clientX, clientY], message)
  }, [setContextMenu, currentChatId])

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getHours()}:${minutes}`;
  }

  function switchIsSelected(message) {
    const messageClassList = document.getElementById(message.id).classList;
    if (!messageClassList.contains(`${styles.isSelected}`)) {
      messageClassList.add(`${styles.isSelected}`)
      setSelectedMessages((prevState) => [
        ...prevState,
        message
      ])
    }
    else {
      messageClassList.remove(`${styles.isSelected}`)
      setSelectedMessages((prevState) => {
        return prevState.filter((entry) => entry.id !== message.id)
      })
    }
  }


  return (
    messages && messages.length !== 0 ? (
      <>
        <div className={styles.chat_messages}>
          {children}
          <ul>
            {messages.map((message, index) => {

              let messageStyles = `${styles.message}`;
              let responseStyles = `${styles.response}`
              if (user.id === message.author.id) {
                messageStyles += ` ${styles.byMe}`;
                responseStyles += ` ${styles.byMe}`
              }

              let truncatedResponse = message?.response?.content;
              
              if (truncatedResponse?.length >= MAX_RESPONSE_LENGTH) {
                truncatedResponse = truncatedResponse.content.slice(0, MAX_RESPONSE_LENGTH) + "...";
              }

              return (
                <li
                  className={messageStyles}
                  key={index}
                  id={message.id}
                  onContextMenu={(event) => handleContextMenu(event, message)}
                  onClick={() => switchIsSelected(message)}
                >
                  {truncatedResponse && 
                    <div className={responseStyles}>
                      <span className={`${styles.responseAuthor} ${styles.unselectable}`}><b>{message?.response?.author}</b></span>
                      <span className={`${styles.responseMessage} ${styles.unselectable}`}>{truncatedResponse}</span>
                    </div>}
                  {message.content}
                  <div className={`${styles.timestamp} ${styles.unselectable}`}>
                    <span>{message.isEdited && 'edited'} {formatTimestamp(message.time)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div >
      </>
    ) : (
      <p className={`${styles.no_messages_info} ${styles.unselectable}`}><i>There are no messages yet. Send your first!</i></p>
    )
  );
}


export default Messages;
