import React, { useRef, useState, useEffect } from 'react';
import Messages from '../components/Messages';
import ChatTopInfo from '../components/ChatTopInfo';

const Chat = () => {

  /* For testing purposes */
  const chats = Array(20).fill().map((_, index) => ({
    'username': `Username ${index + 1}`,
    'lastMessage': 'Last message',
    'messages': [
      {
        "author": `Username ${index}`,
        "content": 'Hello world!'
      },
      {
        "author": `Username ${index + 1}`,
        "content": 'Hi!'
      },
    ]
  }));


  const chatRefs = useRef(Array.from({ length: chats.length }, () => React.createRef()));


  const [isToggled, setIsToggled] = useState(Array(chats.length).fill(false));
  const [chatIndex, setChatIndex] = useState();
  const [isAnyToggled, setIsAnyToggled] = useState(false);
  const [currentInterlocutor, setCurrentInterlocutor] = useState({});
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    
  }


  const toggleFocus = (index) => {
    setIsToggled(() => {
      const newState = Array(chats.length).fill(false);
      newState[index] = !newState[index];
      return newState;
    });
    setChatIndex(index);
    setCurrentInterlocutor(chats[index]);
  };

  
  useEffect(() => {
    isToggled.map((_, index) => {
      if(isToggled[index] === true)
        setIsAnyToggled(true);
      })
  }, [isToggled]);

 



  return (
    <div className='flex-container'>
      <div className='message-list'>
        <div className="chat-header">
          <div className="chat-logo"/>
        </div>
        <ul className='chat-messages'>
          {Array.from({ length: chats.length }).map((_, index) => (
            <li
              key={index}
              className={isToggled[index] ? "chat-profile __focus" : "chat-profile"}
              ref={chatRefs.current[index]}
              onClick={() => toggleFocus(index)}
            >

              <div className='chat-avatar'/>
              <div className='chat-preview'>
                <article className='chat-username unselectable'>{chats[index].username}</article>
                <article className='unselectable'>{chats[index].lastMessage}</article>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={isAnyToggled ? 'chat' : 'offscreen'}>
        <ChatTopInfo user={currentInterlocutor}/>
        <Messages/>

        <div className='chat-container'>
            <input placeholder='Message...' onChange={(e) => setMessage(e.target.value)}/>
            <button 
              className={message ? 'send-button __active' : 'send-button __inactive'}
              onClick={sendMessage}
              >
              <div className={message ? 'send-img __active' : 'send-img __inactive'}/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;