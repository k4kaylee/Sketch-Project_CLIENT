const useChatUpdater = () => {

    const addMessage = (currentChatId, newMessage, setChats) => {
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

    return {
        addMessage
      };

    
}

export default useChatUpdater;