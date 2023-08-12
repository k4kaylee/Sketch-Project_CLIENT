import React, { useState } from 'react';
import '../../App.css';

const ChatListHeader = ({search}) => {
    const [focus, setFocus] = useState(false);
    const setSearch = search;

    const handleSearchIconClick = () => {
        setFocus(!focus);
    };

    return (
        <div className='chat-listHeader'>
            {focus ?
                <>
                    <div className='chat-search __focus'>
                        <i className='search-icon __focus' onClick={handleSearchIconClick} />
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
                        <i className='search-icon' onClick={handleSearchIconClick} />
                    </div>
                </>
            }
        </div>
    )
}

export default ChatListHeader;
