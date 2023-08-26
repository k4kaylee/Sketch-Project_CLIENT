import React, { useCallback, useContext, useMemo, useState } from 'react';
import '../../../App.css'; //to be restructurised
import '../Messages/Messages.css'
import { AuthContext } from '../../../context/AuthContext';
import { useContextMenu } from '../../hooks/useContextMenu';
import Notice from '../../misc/Notice/Notice'
import useChatUpdater from '../../hooks/useChatUpdater';



const Messages = ({ messages, currentChatId, setChats, setShowModal }) => {
  const { user } = useContext(AuthContext);
  const { setContextMenu } = useContextMenu();
  const [notification, setNotification] = useState('');

  const { deleteMessage } = useChatUpdater();
  const hideDeletedMessage = (id) => {
    const message = document.getElementById(id);
    if (message) {
      message.classList.add('message-fade-away');
    }
  }

  const contextMenu = useMemo(() => [{
    name: 'Edit',
    onClick: (message) => editMsg(message)
  },
  {
    name: 'Delete',
    onClick: (message) => {
      setShowModal(true);
      hideDeletedMessage(message.id);
      setTimeout(() => {
        deleteMessage(currentChatId, message, setChats);
      }, 400);
    }
  },
  {
    name: 'Copy the text',
    onClick: (message) => copyMsg(message)
  },

  ], [deleteMessage, currentChatId, setChats, setShowModal])

  const editMsg = () => { //useChatUpdater

  }


  const copyMsg = (message) => {
    navigator.clipboard.writeText(message.content)
      .then(() => {
        setNotification('Message was copied to clipboard');
      })
      .catch((error) => {
        setNotification('Failed to copy text:', error);
      });
    setNotification('');
  }

  const handleContextMenu = useCallback((event, message) => {
    event.preventDefault();

    const { clientX, clientY } = event
    setContextMenu(contextMenu, [clientX, clientY], message)
  }, [setContextMenu, contextMenu])

  return (
    messages.length !== 0 ? (
      <>
        <div className='chat-messages'>
          <Notice content={notification} />
          <ul>
            {
              messages.map((message, index) => (
                <li className={user.id === message.author ? 'message byMe' : 'message'}
                  key={index}
                  id={message.id}
                  onContextMenu={(event) => handleContextMenu(event, message)}
                >
                  {message.content}
                </li>
              ))
            }
          </ul>

        </div>
      </>

    ) : (
      <p className='no-messages-info unselectable'><i>There is no messages yet. Send your first!</i></p>
    )
  )
}


export default Messages;
