import React, { useState, useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';



const ChatList = (props) => {

    const { chats, setInterlocutor, setChatIndex, setIsAnyToggled, anyToggled } = props;
    const [isToggled, setIsToggled] = useState(Array(chats.length).fill(false));
    const setCurrentInterlocutor = setInterlocutor;
    const isAnyToggled = anyToggled;

    const chatRefs = useRef(Array.from({ length: chats.length }, () => React.createRef()));
    const messageInputRef = props.messageInputRef;


    const toggleFocus = (index) => {
        setIsToggled(() => {
          const newState = Array(chats.length).fill(false);
          newState[index] = !newState[index];
          return newState;
        });
        setChatIndex(index);
        setCurrentInterlocutor(chats[index]);
        messageInputRef.current.focus();
      };
    
    
      useEffect(() => {
        isToggled.map((_, index) => {
          if (isToggled[index] === true)
            setIsAnyToggled(true);
        })
      }, [isToggled]);

      

  return (
    <div className={isAnyToggled ? 'chat-chatlist' : 'chat-chatlist unconcealable'}>
        <div className='chat-header'>
          <div className='chat-logo' />
        </div>
        <SimpleBar className='scroll'>
          <ul style={{paddingRight: '13px'}}>
              {Array.from({ length: chats.length }).map((_, index) => (
                <li
                  key={index}
                  className={isToggled[index] ? 'chat-profile __focus' : 'chat-profile'}
                  ref={chatRefs.current[index]}
                  onClick={() => toggleFocus(index)}
                >
                  <div className='chat-avatar' />
                  <div className='chat-preview'>
                    <article className='chat-username unselectable'>{chats[index].username}</article>
                    <article className='unselectable'>{chats[index].lastMessage}</article>
                  </div>
                </li>
              ))}

          </ul>
        </SimpleBar>
      </div>
  )
}

export default ChatList;
