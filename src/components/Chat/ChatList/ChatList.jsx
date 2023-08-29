import React, { useState, useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import styles from './ChatList.module.css'



const ChatList = ({ chats, setCurrentChat, setChatIndex, setIsAnyToggled, isAnyToggled, messageInputRef }) => {

  const MAX_LASTMESSAGE_LENGTH = 25;

  const [isToggled, setIsToggled] = useState(Array(chats.length).fill(false));
  const [listContent, setListContent] = useState([]);
  const [search, setSearch] = useState('');

  const chatRefs = useRef(Array.from({ length: chats.length }, () => React.createRef()));

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
    <div className={isAnyToggled ? `${styles.chatlist}` : `${styles.chatlist} ${styles.unconceable}`}>
      <ChatListHeader search={setSearch} />
      <SimpleBar className={`${styles.scroll}`}>
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
                  className={isToggled[index] ? `${styles.profile} ${styles.__focus}` : `${styles.profile}`}
                  ref={chatRefs.current[index]}
                  onClick={() => toggleFocus(index)}
                >
                  <div className={`${styles.avatar}`} />
                  <div className={`${styles.preview}`}>
                  <article className={`${styles.username} ${styles.unselectable}`}>{chat.name}</article>
                    <article className={`${styles.last_message} ${styles.unselectable}`}>{truncatedMessage}</article>
                  </div>
                </li>
              );
            })
          ) : (
            <p className={`${styles.no_chats_message} ${styles.unselectable}`}><i>No chats available.</i></p>
          )}
        </ul>

      </SimpleBar>
    </div>
  )
}

export default ChatList;
