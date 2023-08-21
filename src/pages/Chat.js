import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';
import axios from '../api/axios';
import ChatList from '../components/Chat/ChatList';
import ChatTopInfo from '../components/Chat/ChatTopInfo';
import Messages from '../components/Chat/Messages';
import ChatInput from '../components/Chat/ChatInput';
import { AuthContext } from '../context/AuthContext';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import '../App.css';
import Waves from '../components/misc/Waves';
import useChatUpdater from '../components/hooks/useChatUpdater';
import { ContextMenuProvider } from '../context/ContextMenu/ContextMenu.provider'


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


  /* useEffects */
  useEffect(() => {
    if (typeof chatIndex !== 'undefined') {
      setMessages(chats[chatIndex].messages);
    }
  }, [chatIndex])

  useEffect(() => {
    loadChats(user.id);
  }, [])


  useEffect(() => {
    if (pendingMessage !== '') {
      sendMessageToServer(pendingMessage);
      setPendingMessage('');
    }
  }, [pendingMessage, messages, currentChat.id]);


  /* Custom functions */
  const { addMessage } = useChatUpdater();

  const sendMessageToServer = useCallback( async (newMessage) => {
    try {
      const message = {
        author: user.id,
        content: newMessage,
        time: new Date().toLocaleString()
      }

      axios.put(`/chats/${currentChat.id}/messages`, {
        author: user.id,
        content: newMessage,
        time: new Date().toLocaleString()
      })

      addMessage(currentChat.id, message, setChats);
    } catch (error) {
    console.log(error.message);
  }
}, [user.id, currentChat.id, addMessage])

const loadChats = async (userId) => {
  try {
    const response = await axios.get(`/chats/${userId}`);
    if (response.status === 200) {
      setChats(response.data);
    }
  } catch (error) {
    console.log(error.message);
  }
}






return (
  <div className='flex-container'>
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
                <Messages messages={messages} />
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