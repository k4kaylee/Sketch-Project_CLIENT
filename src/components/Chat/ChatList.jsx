import React, { useState, useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ChatListHeader from './ChatListHeader';



const ChatList = (props) => {
  const MAX_LASTMESSAGE_LENGTH = 25;

  const { chats, setChat, setChatIndex, setIsAnyToggled, anyToggled } = props;
  const setCurrentChat = setChat;
  const isAnyToggled = anyToggled;

  const [isToggled, setIsToggled] = useState(Array(chats.length).fill(false));
  const [listContent, setListContent] = useState([]);
  const [search, setSearch] = useState('');

  const chatRefs = useRef(Array.from({ length: chats.length }, () => React.createRef()));
  const messageInputRef = props.messageInputRef;

  useEffect(() => {
    isToggled.map((_, index) => {
      if (isToggled[index] === true)
        setIsAnyToggled(true);
    })
  }, [isToggled]);


  useEffect(() => {
    handleSearch();
  }, [search, chats])


  const toggleFocus = (index) => {
    setIsToggled(() => {
      const newState = Array(chats.length).fill(false);
      newState[index] = !newState[index];
      return newState;
    });
    setChatIndex(index);
    setCurrentChat(chats[index]);
    messageInputRef.current.focus();
  };

  const handleSearch = () => {
    if (!search) {
      setListContent(chats);
      return;
    }
    const result = chats.filter((chat) => {
      return chat.name.toLowerCase().includes(search.toLowerCase());
    });
    setListContent(result);
  }






  return (
    <div className={isAnyToggled ? 'chat-chatlist' : 'chat-chatlist unconcealable'}>
      <ChatListHeader search={setSearch} />
      <SimpleBar className='scroll'>
        <ul>
          {chats && chats.length > 0 ? (
            Array.from({ length: listContent.length }).map((_, index) => {
              const chat = listContent[index];
              const lastMessage = chat.messages[chat.messages.length - 1];
              let truncatedMessage;
              if (lastMessage && lastMessage.content) {
                truncatedMessage = lastMessage.content;

                if (truncatedMessage.length >= MAX_LASTMESSAGE_LENGTH) {
                  truncatedMessage = truncatedMessage.slice(0, MAX_LASTMESSAGE_LENGTH) + "...";
                }
              }

              return (
                <li
                  key={index}
                  className={isToggled[index] ? 'chat-profile __focus' : 'chat-profile'}
                  ref={chatRefs.current[index]}
                  onClick={() => toggleFocus(index)}
                >
                  <div className='chat-avatar' />
                  <div className='chat-preview'>
                    <article className='chat-username unselectable'>{chat.name}</article>
                    <article className='chat-lastmessage unselectable'>{truncatedMessage}</article>
                  </div>
                </li>
              );
            })
          ) : (
            <p className='no-chats-message unselectable'><i>No chats available.</i></p>
          )}
        </ul>

      </SimpleBar>
    </div>
  )
}

export default ChatList;
