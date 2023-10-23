import axios from "../../api/axios";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const useChatUpdater = () => {
  
  const { user } = useContext(AuthContext)

  const sendMessage = useCallback(async (newMessage, user, currentChatId) => {
    try {
      await axios.put(`/chats/${currentChatId}/messages`, {
        author: {
          name: user.name,
          id: user.id,
        },
        content: newMessage,
        time: new Date().toISOString()
      });
    } catch (error) {
      console.log(error.message);
    }

  }, []);



  const updateChat = async (setChats, currentChatId) => {
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

  const editMessage = async (editedMessage, currentChatId, setChats) => {
    try {
      const response = await axios.put(`/chats/${currentChatId}/messages/${editedMessage.id}`, { content: editedMessage.message })

      if (response.status === 200) {
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === response.data.chat.id) {
              const chatName = chat.nameVocabulary.find((entry) => entry.id === user.id).name
              return {
                ...response.data.chat,
                name: chatName,
              }
            }
            return chat;
          });
        });
      }
    } catch (error) {
      console.log(error.message)
    }

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