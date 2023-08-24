import axios from "../../api/axios";

const useChatUpdater = () => {

  const addMessage = (currentChatId, newMessage, setChats) => { //Obsolete?
    setChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      });
      return updatedChats;
    });
  }

  const editMessage = () => { //useChatUpdater

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
    addMessage,
    editMessage,
    deleteMessage
  };



}

export default useChatUpdater;