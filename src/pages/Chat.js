import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import ChatList from '../components/Chat/ChatList/ChatList';
import ChatTopInfo from '../components/Chat/ChatTopInfo/ChatTopInfo';
import Messages from '../components/Chat/Messages/Messages';
import ChatInput from '../components/Chat/ChatInput/ChatInput';
import { AuthContext } from '../context/AuthContext.jsx';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Waves from '../components/misc/Waves';
import { ContextMenuProvider } from '../context/ContextMenu/ContextMenu.provider';
import { ModalProvider } from '../context/Modal/Modal.provider';
import useChatUpdater from '../components/hooks/useChatUpdater';
import Loader from '../components/misc/Loader/Loader';
import '../App.css';


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
  const [isLoadingChats, setIsLoadingChats] = useState(true);

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
      console.log(error.message);
    } finally {
      setIsLoadingChats(false);
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
  }, [user.id])

  useEffect(() => {
    if (pendingMessage !== '') {
      sendMessage(pendingMessage, user.id, currentChat.id)
        .then(() => updateChat(setChats, currentChat.id)
          .then(() => {
            const updatedChat = chats.find(chat => chat.id === currentChat.id);
            console.log(updatedChat.messages);
          })
        )
        .then(() => setPendingMessage(''))
        .catch(error => {
          console.log("Error:", error);
          setPendingMessage('');
        });
    }
  }, [pendingMessage, sendMessage, updateChat, user.id]);

  /* Constants */
  const scrollHeight = '88vh';

  if (isLoadingChats) {
    return <Loader />;
  }

  return (
    <ModalProvider>
      <div className='flex-container fadeIn' styles={{overflowY: 'hidden'}}>
        <ChatList chats={chats}
          setChats={setChats}
          setCurrentChat={setCurrentChat}
          setIsAnyToggled={setIsAnyToggled}
          setChatIndex={setChatIndex}
          isAnyToggled={isAnyToggled}
          messageInputRef={messageInputRef}
        />
        <div className={isAnyToggled ? 'chat' : 'offscreen'}>
          {currentChat !== null ? (
            <>
              <ChatTopInfo currentChat={currentChat} />
              <SimpleBar className='scroll' style={{ height: scrollHeight }}>
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
