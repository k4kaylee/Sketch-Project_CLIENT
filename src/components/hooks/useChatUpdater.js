import axios from "../../api/axios";
import socket from "../../api/socket";
import { useCallback } from "react";

const useChatUpdater = () => {


  // const sendMessage = useCallback(async (newMessage, userId, currentChatId) => {
  //   try {
  //     await axios.put(`/chats/${currentChatId}/messages`, {
  //       author: userId,
  //       content: newMessage,
  //       time: new Date().toLocaleString()
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }

  // }, []);

//  A version for web sockets, in development
//
const sendMessage = useCallback((newMessage, userId, currentChatId) => {
    if (socket.readyState === WebSocket.OPEN) {
      const message = {
        author: userId,
        content: newMessage,
        time: new Date().toLocaleString(),
        chatId: currentChatId,
      };
      socket.send(JSON.stringify({
        message: message,
        method: "sendMessage"
      }
      ));
    }
  }, []);

  const updateChat = async( setChats, currentChatId ) => {
    const response = await axios.get(`/chats/${currentChatId}`);
      if (response.status === 200) {
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: response.data.messages
              };
            }
            return chat;
          });
        });
      }
  }

  const editMessage = () => {
    alert("In development");
  }

  const deleteMessage = (currentChatId, messageToDelete, setChats) => {
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: chat.messages.filter(message => message.id !== messageToDelete.id)
          };
        }
        return chat;
      });
      return updatedChats;
    });

    axios.delete(`chats/${currentChatId}/messages/${messageToDelete.id}`, {
      messageId: messageToDelete.id,
      chatId: currentChatId
    })

  };


  return {
    sendMessage,
    editMessage,
    deleteMessage,
    updateChat
  };



}

export default useChatUpdater;