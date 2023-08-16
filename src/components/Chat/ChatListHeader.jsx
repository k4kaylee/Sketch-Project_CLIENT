import React, { useState } from 'react';
import '../../App.css';

const ChatListHeader = ({search}) => {
    const [focus, setFocus] = useState(false);
    const setSearch = search;

    const toggleFocus = () => {
        setFocus(!focus);
    };

    return (
        <div className='chat-listHeader'>
            {focus ?
                <>
                    <i className='arrow-back-icon  ' onClick={toggleFocus}/>
                    <div className='chat-search __focus'>
                        <i className='search-icon __focus' />
                        <input className='search-input'
                            placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </>
            :
                <>
                    <div className='chat-logo' />
                    <div className='chat-search'>
                        <i className='search-icon' onClick={toggleFocus} />
                    </div>
                </>
            }
        </div>
    )
}

export default ChatListHeader;
