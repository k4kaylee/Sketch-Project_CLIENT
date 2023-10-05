import React, { useState, useEffect, useRef, useContext } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ChatListHeader from '../ChatListHeader/ChatListHeader';
import ResizeHandle from '../../misc/ResizeHandle/ResizeHandle';
import styles from './ChatList.module.css'
import axios from '../../../api/axios';
import { AuthContext } from '../../../context/AuthContext.jsx';



const ChatList = ({ chats, setChats, setCurrentChat, setChatIndex, setIsAnyToggled, isAnyToggled, messageInputRef }) => {

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

  const { user } = useContext(AuthContext);
  const createChat = async (intelocutor) => {
    try {
      const response = await axios.put(`/chats/user/${user.id}`, {
        participants: [{
          id: user.id,
          name: user.name
        },
        {
          id: intelocutor.id,
          name: intelocutor.name
        }],
        avatar: intelocutor.avatar,
        nameVocabulary: [{
          id: user.id,
          name: intelocutor.name
        },
        {
          id: intelocutor.id,
          name: user.name
        }]

      })

      return response;
    } catch (error) {
      console.log(error.message);
    }
  }
  

  const openChat = async (user) => {
    const chatWithUser = chats.find(chat => {
      return chat.participants.some(participant => participant.id === user.id);
    });

    let index;
    if (chatWithUser) {

      index = listContent.findIndex(chat => chat.id === chatWithUser.id);

      setCurrentChat(chatWithUser);
      messageInputRef.current.focus();
      setIsAnyToggled(true);
    } else {
      try {
        const response = await createChat(user);
        const chatName = response.data.nameVocabulary.find((entry) => entry.id !== user.id).name;
        const newChat = {
          ...response.data,
          name: chatName
        };


        setChats(prevChats => [...prevChats, newChat]);
        index = chats.length``;
        setCurrentChat(newChat);
        messageInputRef.current.focus();
        setIsAnyToggled(true);
      } catch (error) {
        console.log("Error:", error.message);
      }
    }

    setIsToggled(() => {
      const newState = Array(chats.length).fill(false);
      newState[index] = !newState[index];
      return newState;
    });
  }


  return (
    <ResizeHandle isAnyToggled={isAnyToggled}>
      <div className={isAnyToggled ? `${styles.chatlist}` : `${styles.chatlist} ${styles.unconcealable}`}>
        <ChatListHeader search={search} setSearch={setSearch} openChat={openChat} />
        <SimpleBar className={`${styles.scroll}`}>
          <ul>
            {chats && chats.length > 0 ? (
              Array.from({ length: listContent.length }).map((_, index) => {
                const chat = listContent[index];
                const lastMessage = chat?.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;

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
