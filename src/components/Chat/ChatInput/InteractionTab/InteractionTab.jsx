import React from 'react'
import styles from './InteractionTab.module.css'

const InteractionTab = ({isInteractionTabVisible, 
                         setIsInteractionTabVisible, 
                         embeddedMessage, 
                         messageInputRef,
                         setIsEditing}) => {

  const handleCancel = () => {
    setIsInteractionTabVisible(false);
    messageInputRef.current.value = '';
    setIsEditing(false);
  }


  if(isInteractionTabVisible)
    return (
      <div className={styles.tab}>
          <div className={`${styles.icon} ${styles[`${embeddedMessage.icon}`]}`}></div>
          <div className={styles.embeddedMessage}>
              <div className={styles.title}>{embeddedMessage.title}</div>
              <div className={styles.content}>{embeddedMessage.content}</div>
          </div>
          <div className={styles.cancelButton} onClick={handleCancel}></div>
      </div>
    )
}

export default InteractionTab; 