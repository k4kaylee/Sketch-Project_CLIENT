import React, { useRef, useState, useEffect } from 'react';

const Chat = () => {

  /* For testing purposes */
  const chats = Array(20).fill(
    {
      'username': 'Username',
      'lastMessage': 'Last message',
    }
  );


  const chatRefs = useRef(Array.from({ length: chats.length }, () => React.createRef()));
  const [isToggled, setIsToggled] = useState(Array(chats.length).fill(false));
  const [isAnyToggled, setIsAnyToggled] = useState(false);


  const toggleFocus = (index) => {
    setIsToggled(() => {
      const newState = Array(chats.length).fill(false);
      newState[index] = !newState[index];
      return newState;
    });
  };

  
  // useEffect(() => {
  //   isToggled.map((index) => {
  //     if(isToggled[index] === true)
  //       setIsAnyToggled(true);

  //     console.log(isAnyToggled);
  //   })
  // }, [isToggled]);



  return (
    <div className='flex-container'>
      <div className='message-list'>
        <div className="chat-header">
          <div className="chat-logo"></div>
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
                <article className=''>{chats[index].username} {index + 1}</article>
                <article className=''>{chats[index].lastMessage}</article>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={isToggled ? 'chat' : 'chat disabled'}>
        <div className='chat-container'>
            <input placeholder='Message...'/><button><div className={isAnyToggled ? 'send-img active' : 'send-img'}/></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;