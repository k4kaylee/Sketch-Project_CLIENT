import React from 'react'
import styles from './InteractionTab.module.css'

const InteractionTab = ({embeddedMessage, 
                         messageInputRef,
                         isEditing,
                         setIsEditing}) => {

  const handleCancel = () => {
    messageInputRef.current.value = '';
    setIsEditing(false);
  }


  if(isEditing)
    return (
      <div className={styles.tab}>
          <div className={`${styles.icon} ${styles[`${embeddedMessage.icon}`]}`}></div>
          <div className={styles.embeddedMessage}>
              <div className={styles.title}>{embeddedMessage.title}</div>
              <div className={styles.content}>{embeddedMessage.content.message}</div>
          </div>
          <div className={styles.cancelButton} onClick={handleCancel}></div>
      </div>
    )
}

export default InteractionTab; 