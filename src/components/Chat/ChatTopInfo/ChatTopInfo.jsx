import React, { useContext, useState, useEffect } from 'react'
import styles from './ChatTopInfo.module.css'
import { AuthContext } from '../../../context/AuthContext'
import useUser from './../../hooks/useUser'
import Chat from '../../../pages/Chat'

const ChatTopInfo = ({currentChat, setCurrentChat, setIsAnyToggled}) => {

  const [intelocutorStatus, setIntelocutorStatus] = useState('Loading');

  const { user } = useContext(AuthContext);
  const { loadUserStatusById } = useUser();


  
  return (
    <>
        <div className={`${styles.top_info}`}>
        <i className={`${styles.arrow_back_icon}`} 
           onClick={() => {setCurrentChat({});
                           setIsAnyToggled(false);}} />
            <div className={`${styles.avatar} ${styles.diminished}`}/>
            <div className={`${styles.preview}`}>
              <article className={`${styles.username} ${styles.unselectable}`}>{currentChat.name}</article>
              <article className={`${styles.unselectable}`}>{intelocutorStatus}</article>
            </div>
        </div>
    </>
  )
}

export default ChatTopInfo;