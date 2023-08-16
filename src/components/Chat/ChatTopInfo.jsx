import React from 'react'
import '../../App.css'

const ChatTopInfo = (current) => {
  return (
    <>
        <div className='chat-top-info' style={{display: 'flex'}}>
            <div className='chat-avatar diminished'/>
            <div className='chat-preview'>
              <article className='chat-username unselectable'>{current.chat.name}</article>
              <article className='unselectable'>status</article>
            </div>
        </div>
    </>
  )
}

export default ChatTopInfo;