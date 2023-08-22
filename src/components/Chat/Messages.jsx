import React, { useCallback, useContext, useMemo, useState } from 'react';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext';
import { useContextMenu } from '../hooks/useContextMenu';
import Notice from '../misc/Notice/Notice.tsx'



const Messages = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const { setContextMenu } = useContextMenu();
  const [notification, setNotification] = useState('');

  const contextMenu = useMemo(() => [{
    name: 'Edit',
    onClick: (message) => editMsg(message)
  },
  {
    name: 'Delete',
    onClick: (message) => deleteMsg(message)
  },
  {
    name: 'Copy the text',
    onClick: (message) => copyMsg(message) // event.target.value
  },

  ], [])

  const editMsg = () => { //useChatUpdater

  }

  const deleteMsg = () => { //useChatUpdater

  }

  const copyMsg = (message) => {
    navigator.clipboard.writeText(message.content)
      .then(() => {
        setNotification('Message was copied to clipboard');
      })
      .catch((error) => {
        setNotification('Failed to copy text:', error);
      });
  }

  const handleContextMenu = useCallback((event, message) => {
    event.preventDefault();

    const {clientX, clientY} = event
    setContextMenu(contextMenu, [clientX, clientY], message)
  }, [setContextMenu, contextMenu])

  return (
      <div className='chat-messages'>
        <Notice content={notification}/>
        <ul>
          {
            messages.map((message, index) => (
              <li className={user.id === message.author ? 'message byMe' : 'message'}
                key={index}
                onContextMenu={(event) => handleContextMenu(event, message)}
              >
                {message.content}
              </li>
            ))
          }
        </ul>
      </div>
  )
}


export default Messages;
