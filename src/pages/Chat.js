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
import Notice from '../components/misc/Notice/Notice';
import { io } from 'socket.io-client'



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
  const [pendingMessage, setPendingMessage] = useState({});
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [notification, setNotification] = useState('');

  /* To be restructured */
  const [embeddedMessage, setEmbeddedMessage] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isInteractionTabVisible, setIsInteractionTabVisible] = useState(false);
  const [messageBeforeEdit, setMessageBeforeEdit] = useState('');

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  /* Custom functions */
  const { sendMessage } = useChatUpdater();
  const { updateChat } = useChatUpdater();

  const loadChats = async (userId) => {
    try {
      const response = await axios.get(`/chats/user/${userId}`);
      if (response.status === 200) {
        const chats = response.data.map((chat) => {
          const name = chat.nameVocabulary.find((entry) => entry.id === user.id).name
          return {
            ...chat,
            name: name ? name : 'Unknown',
          }
        })
        setChats(chats);
      }
    } catch (error) {
      setNotification(error.message); // Need to find a solution
      
    } finally {
      setIsLoadingChats(false);
    }
  }

  /* useEffects */
  useEffect(() => {
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }, [notification])

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, [])
  
  useEffect(() => {
    if (socket === null)
      return;
    socket.emit("addNewUser", user.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    })
    socket.on("getMessage", (res) => {
      setMessages((prevMessages) => [...prevMessages, res]);
  
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          if (chat.id === res.chatId) {
            return {
              ...chat,
              messages: [...chat.messages, res],
            };
          }
          return chat;
        });
      });
    });

    socket.on("updateChat", (chatId) => {
      updateChat(setChats, chatId);
    })

    return () => {
      socket.off("disconnect");
    };
  }, [socket])

  useEffect(() => {
    if (typeof chatIndex !== 'undefined') {
      setMessages(chats[chatIndex].messages);
    }
  }, [chatIndex, chats])

  useEffect(() => {
    if(user)
      loadChats(user.id);
  }, [user.id])

  useEffect(() => {
    if (pendingMessage !== '') {
      sendMessage(pendingMessage, user, currentChat.id)
        .then(() => updateChat(setChats, currentChat.id))
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
      <div className='chat-container fadeIn'>
        <ChatList chats={chats}
          setChats={setChats}
          setCurrentChat={setCurrentChat}
          setIsAnyToggled={setIsAnyToggled}
          setChatIndex={setChatIndex}
          isAnyToggled={isAnyToggled}
          messageInputRef={messageInputRef}
          onlineUsers={onlineUsers}
        />
        <div className={isAnyToggled ? 'chat' : 'offscreen'}>
          {currentChat !== null && (
            <>
              <ChatTopInfo currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                setIsAnyToggled={setIsAnyToggled}
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                setChats={setChats}
                setNotification={setNotification}
                onlineUsers={onlineUsers} />
              <SimpleBar className='scroll' style={{ height: scrollHeight }}>
                <ContextMenuProvider>
                  <Messages
                    setEmbeddedMessage={setEmbeddedMessage}
                    messages={messages}
                    currentChatId={currentChat.id}
                    setChats={setChats}
                    messageInputRef={messageInputRef}
                    setMessageBeforeEdit={setMessageBeforeEdit}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setNotification={setNotification}
                    setSelectedMessages={setSelectedMessages}
                    setIsInteractionTabVisible={setIsInteractionTabVisible}
                    socket={socket}
                  >
                    <Notice content={notification} />
                  </Messages>  
                  <Waves styles='chat-waves' />
                </ContextMenuProvider>
              </SimpleBar>
              <ChatInput 
                embeddedMessage={embeddedMessage}
                messageInputRef={messageInputRef}
                messages={messages}
                currentChat={currentChat}
                setChats={setChats}
                setMessages={setMessages}
                setPendingMessage={setPendingMessage}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isInteractionTabVisible={isInteractionTabVisible}
                setIsInteractionTabVisible={setIsInteractionTabVisible}
                messageBeforeEdit={messageBeforeEdit}
                socket={socket}
              />
            </>
          )}
        </div>
      </div>
    </ModalProvider>
  );
};

export default Chat;
