import React, { useContext, useState, useEffect } from 'react';
import styles from './ChatTopInfo.module.css';
import { AuthContext } from '../../../context/AuthContext';

const ChatTopInfo = ({ currentChat, setCurrentChat, setIsAnyToggled, onlineUsers }) => {
  const [intelocutorStatus, setIntelocutorStatus] = useState('Loading...');

  const { user } = useContext(AuthContext);

  const getIntelocutorId = () => {
    return currentChat.participants.find((participant) => participant.id !== user.id).id;
  };

  useEffect(() => {
    const loadIntelocutorStatus = async () => {
      if (onlineUsers.length > 0 && currentChat.participants) {
        const intelocutorId = getIntelocutorId();

        if (onlineUsers.find((user) => user.id === intelocutorId) !== undefined) {
          setIntelocutorStatus('Online');
        } else {
          setIntelocutorStatus('Offline');
        }
      }
    };

    if (currentChat && onlineUsers.length > 0) {
      loadIntelocutorStatus();
    } else {
      setIntelocutorStatus('Loading...');
    }
  }, [onlineUsers, currentChat]);

  return (
    <>
      <div className={`${styles.top_info}`}>
        <i
          className={`${styles.arrow_back_icon}`}
          onClick={() => {
            setCurrentChat({});
            setIsAnyToggled(false);
          }}
        />
        <div className={`${styles.avatar} ${styles.diminished}`} />
        <div className={`${styles.preview}`}>
          <article className={`${styles.username} ${styles.unselectable}`}>{currentChat.name}</article>
          <article className={`${styles.unselectable}`}>{intelocutorStatus}</article>
        </div>
      </div>
    </>
  );
};

export default ChatTopInfo;
