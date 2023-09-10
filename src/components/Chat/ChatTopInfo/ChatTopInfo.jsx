import React from 'react'
import styles from './ChatTopInfo.module.css'

const ChatTopInfo = (current) => {
  return (
    <>
        <div className={`${styles.top_info}`}>
            <div className={`${styles.avatar} ${styles.diminished}`}/>
            <div className={`${styles.preview}`}>
              <article className={`${styles.username} ${styles.unselectable}`}>{current.chat.name}</article>
              <article className={`${styles.unselectable}`}>status</article>
            </div>
        </div>
    </>
  )
}

export default ChatTopInfo;