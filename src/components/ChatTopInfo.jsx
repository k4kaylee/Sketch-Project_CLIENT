import React from 'react'
import '../App.css'

const ChatTopInfo = (props) => {

  return (
    <>
        <div className='chat-top-info' style={{display: 'flex'}}>
            <div className='chat-avatar diminished'/>
            <div className='chat-preview'>
              <article className='chat-username unselectable'>{props.user.username}</article>
              <article className='unselectable'>status</article>
            </div>
        </div>
    </>
  )
}

export default ChatTopInfo;