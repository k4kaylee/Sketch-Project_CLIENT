import React, { useState, useEffect, useRef, useContext } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import ResizeHandle from '../../misc/ResizeHandle/ResizeHandle';
import { AuthContext } from '../../../context/AuthContext';
import styles from './ChatList.module.css'
import axios from '../../../api/axios';



const ChatList = ({ chats, setCurrentChat, setIsAnyToggled, isAnyToggled, messageInputRef, loadChats }) => {

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

  const { user } = useContext(AuthContext);
  const createChat = async (intelocutor) => {
    console.log(user)
    try {
      await axios.post(`/chats`, {
        name: intelocutor.name,
        participantsId: [user.id, intelocutor.id],
        avatar: intelocutor.avatar
      });
    } catch (error) {
      console.log(error.message);
    }

  }

  const openChat = (user) => {
    const chatWithUser = chats.find(chat => {
      return chat.name === user.name && chat.participantsID.includes(user.id);
    });

    if(chatWithUser){
      const index = listContent.findIndex(chat => chat.id === chatWithUser.id);
      setIsToggled(() => {
        const newState = Array(chats.length).fill(false);
        newState[index] = !newState[index];
        return newState;
      });
      setCurrentChat(chatWithUser);
      messageInputRef.current.focus();
      setIsAnyToggled(true);
    } else {
      createChat(user);
      loadChats()
      .then(()=> {
        setCurrentChat(chatWithUser);
        messageInputRef.current.focus();
        setIsAnyToggled(true);
      }
      );
    }
    messageInputRef.current.focus();
    setIsAnyToggled(true);
  }


  return (
    <ResizeHandle isAnyToggled={isAnyToggled}>
      <div className={isAnyToggled ? `${styles.chatlist}` : `${styles.chatlist} ${styles.unconcealable}`}>
        <ChatListHeader search={search} setSearch={setSearch} openChat={openChat}/>
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
    </ResizeHandle>
  )
}

export default ChatList;
