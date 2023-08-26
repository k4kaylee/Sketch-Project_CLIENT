import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api/axios';
import ChatList from '../components/Chat/ChatList';
import ChatTopInfo from '../components/Chat/ChatTopInfo';
import Messages from '../components/Chat/Messages/Messages';
import ChatInput from '../components/Chat/ChatInput';
import { AuthContext } from '../context/AuthContext';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '../App.css';
import Waves from '../components/misc/Waves';
import useChatUpdater from '../components/hooks/useChatUpdater';
import { ContextMenuProvider } from '../context/ContextMenu/ContextMenu.provider'
import Modal from '../components/misc/Modal/Modal';


const Chat = () => {

  /* Context */
  const { user } = useContext(AuthContext);


  /* Refs */
  const messageInputRef = useRef();


  /* States */
  const [chatIndex, setChatIndex] = useState();
  const [isAnyToggled, setIsAnyToggled] = useState(false);
  const [currentChat, setCurrentChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [pendingMessage, setPendingMessage] = useState('');
  const [showModal, setShowModal] = useState(true);


  /* Custom functions */

  const sendMessageToServer = useCallback(async (newMessage) => {
    try {
      await axios.put(`/chats/${currentChat.id}/messages`, {
        author: user.id,
        content: newMessage,
        time: new Date().toLocaleString()
      });
      
      
      const response = await axios.get(`/chats/${currentChat.id}`);
      if (response.status === 200) {
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === currentChat.id) {
              return {
                ...chat,
                messages: response.data.messages
              };
            }
            return chat;
          });
        });
      }
    } catch (error) {
      console.log(error.message);
    }

  }, [user.id, currentChat.id]);
  
  
  

  const loadChats = async (userId) => {
    try {
      const response = await axios.get(`/chats/user/${userId}`);
      if (response.status === 200) {
        setChats(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  /* useEffects */
  useEffect(() => {
    if (typeof chatIndex !== 'undefined') {
      setMessages(chats[chatIndex].messages);
    }
  }, [chatIndex, chats])

  useEffect(() => {
    loadChats(user.id);
  }, [ user.id])


  useEffect(() => {
    if (pendingMessage !== '') {
      sendMessageToServer(pendingMessage);
      setPendingMessage('');
    }
  }, [pendingMessage, messages, currentChat.id, sendMessageToServer]);






  return (
    <div className='flex-container'>
      {showModal ? (
      <Modal header='Delete message'
             content='It will not be possible to restore this message. Are you sure?'
             setShowModal={ setShowModal }
             />
      ) : <></>}
      <ChatList chats={chats}
        anyToggled={isAnyToggled}
        setIsAnyToggled={setIsAnyToggled}
        setChatIndex={setChatIndex}
        chatIndexState={setChatIndex}
        setChat={setCurrentChat}
        messageInputRef={messageInputRef}
      />

      <div className={isAnyToggled ? 'chat' : 'offscreen'}>
        <ChatTopInfo chat={currentChat} />
        <SimpleBar className='scroll' style={{ maxHeight: '88vh' }}>
          <ContextMenuProvider>
            {
              chatIndex !== undefined ? (
                <Messages messages={messages} 
                          currentChatId={currentChat.id} 
                          setChats={setChats}
                          setShowModal={setShowModal}
                />
              ) : (
                <></>
              )
            }

            <Waves styles='chat-waves' />
          </ContextMenuProvider>
        </SimpleBar>

        <ChatInput messageInputRef={messageInputRef}
          messages={messages}
          setMessages={setMessages}
          setPendingMessage={setPendingMessage}
        />
      </div>
    </div>
  );
};

export default Chat;