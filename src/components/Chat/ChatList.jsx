import React, { useState, useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ChatListHeader from './ChatListHeader';



const ChatList = (props) => {

  const { chats, setInterlocutor, setChatIndex, setIsAnyToggled, anyToggled } = props;
  const setCurrentInterlocutor = setInterlocutor;
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
    console.log(search);
    console.log(listContent);
  }, [search])



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

  const handleSearch = () => {
    if (!search) {
      setListContent(chats);
      return;
    }
    const result = chats.filter((chat) => {
      return chat.username.toLowerCase().includes(search.toLowerCase());
    });
    setListContent(result);
  }



  return (
    <div className={isAnyToggled ? 'chat-chatlist' : 'chat-chatlist unconcealable'}>
      <ChatListHeader search={setSearch} />
      <SimpleBar className='scroll'>
        <ul>
          {Array.from({ length: listContent.length }).map((_, index) => (
            <li
              key={index}
              className={isToggled[index] ? 'chat-profile __focus' : 'chat-profile'}
              ref={chatRefs.current[index]}
              onClick={() => toggleFocus(index)}
            >
              <div className='chat-avatar' />
              <div className='chat-preview'>
                <article className='chat-username unselectable'>{listContent[index].username}</article>
                <article className='unselectable'>{listContent[index].lastMessage}</article>
              </div>
            </li>
          ))}

        </ul>
      </SimpleBar>
    </div>
  )
}

export default ChatList;
