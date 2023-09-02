import React, { useState, useEffect } from 'react'
import styles from './ResizeHandle.module.css'


const ResizeHandle = ({children, isAnyToggled}) => {

  const [isResizing, setIsResizing] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [chatListWidth, setChatListWidth] = useState('400px');

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setInitialX(e.clientX);
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;

    const widthDiff = e.clientX - initialX;
    const currentWidth = parseInt(chatListWidth) + widthDiff;
    if ( currentWidth < 300 ){
      setChatListWidth('300px');
        return;
    } else if ( currentWidth > 600 ) {
      setChatListWidth('600px');
        return;
    }

    const newWidth = `calc(${chatListWidth} + ${widthDiff}px)`;

    setChatListWidth(newWidth);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.userSelect = 'auto';
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  

    return (
        <div className={isAnyToggled ? `${styles.container}` : `${styles.container} ${styles.unconcealable}`} 
        style={{ width: chatListWidth}} >
            {children}
            <div id={`${styles.resize_handle}`} onMouseDown={handleMouseDown}/>
        </div>
    )
}

export default ResizeHandle