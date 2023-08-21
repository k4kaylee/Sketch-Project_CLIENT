import React, { useCallback, useContext, useMemo } from 'react';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext';
import { useContextMenu } from '../hooks/useContextMenu';



const Messages = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const { setContextMenu } = useContextMenu();

  const contextMenu = useMemo(() => [{
    name: 'Edit',
    onClick: () => {alert('Click!')} //editMsg
  },
  {
    name: 'Delete',
    onClick: () => {alert('Click!')} //deleteMsg
  },
  ], [])

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();

    const {clientX, clientY} = event
    console.log(setContextMenu)
    setContextMenu(contextMenu, [clientX, clientY])
  }, [setContextMenu, contextMenu])

  return (
      <div className='chat-messages'>
        <ul>
          {
            messages.map((message, index) => (
              <li className={user.id === message.author ? 'message byMe' : 'message'}
                key={index}
                onContextMenu={(event) => handleContextMenu(event)}
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
