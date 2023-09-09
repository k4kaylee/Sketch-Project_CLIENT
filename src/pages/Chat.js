import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import ChatList from '../components/Chat/ChatList/ChatList';
import ChatTopInfo from '../components/Chat/ChatTopInfo/ChatTopInfo';
import Messages from '../components/Chat/Messages/Messages';
import ChatInput from '../components/Chat/ChatInput/ChatInput';
import { AuthContext } from '../context/AuthContext';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Waves from '../components/misc/Waves';
import { ContextMenuProvider } from '../context/ContextMenu/ContextMenu.provider';
import { ModalProvider } from '../context/Modal/Modal.provider';
import useChatUpdater from '../components/hooks/useChatUpdater';
import '../App.css';


const Chat = () => {

  /* Context */
  const { user } = useContext(AuthContext);


  /* Refs */
  const messageInputRef = useRef();


  /* States */
  const [chats, setChats] = useState([]);
  const [isAnyToggled, setIsAnyToggled] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [pendingMessage, setPendingMessage] = useState('');


  /* Custom functions */
  const { sendMessage } = useChatUpdater();
  const { updateChat } = useChatUpdater();

  const loadChats = async (userId) => {
    try {
      const response = await axios.get(`/chats/user/${userId}`);
      if (response.status === 200) {
        setChats(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* useEffects */
  useEffect(() => {
    if (currentChat !== null) {
      setMessages(currentChat.messages);
    }
  }, [currentChat])

  useEffect(() => {
    loadChats(user.id);
  }, [user.id, user])


  useEffect(() => {
    if (pendingMessage !== '' && currentChat !== null) {
      sendMessage(pendingMessage, user.id, currentChat.id)
        .then(() => updateChat(setChats, currentChat.id))
        .then(() => setPendingMessage(''))
        .catch(error => {
          console.log("Error:", error);
          setPendingMessage('');
        });
    }
  }, [pendingMessage, currentChat, sendMessage, updateChat, user.id]);



  /* Constants */
  const scrollHeight = '88vh';


  return (
    <ModalProvider>
      <div className='flex-container'>
        <ChatList chats={chats}
          setCurrentChat={setCurrentChat}
          setIsAnyToggled={setIsAnyToggled}
          isAnyToggled={isAnyToggled}
          messageInputRef={messageInputRef}
          loadChats={loadChats}
        />
        <div className={isAnyToggled ? 'chat' : 'offscreen'}>
          {currentChat !== null ? (
            <>
              <ChatTopInfo chat={currentChat} />
              <SimpleBar className='scroll' style={{ maxHeight: scrollHeight }}>
                <ContextMenuProvider>
                  <Messages messages={messages}
                    currentChatId={currentChat.id}
                    setChats={setChats}
                  />
                  <Waves styles='chat-waves' />
                </ContextMenuProvider>
              </SimpleBar>
            </>
          ) : (
            <></>
          )}

          <ChatInput messageInputRef={messageInputRef}
            messages={messages}
            setMessages={setMessages}
            setPendingMessage={setPendingMessage}
          />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Chat;

