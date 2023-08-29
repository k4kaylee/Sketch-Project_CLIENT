import React, { useState } from 'react';
import styles from './ChatListHeader.module.css'
import '../../../App.css'

const ChatListHeader = ({search}) => {
    const [focus, setFocus] = useState(false);
    const setSearch = search;

    const toggleFocus = () => {
        setFocus(!focus);
    };

    return (
        focus ?
            <>
                <div className={`${styles.list_header}`}>
                    <i className={`${styles.arrow_back_icon}`} onClick={toggleFocus}/>
                    <div className={`${styles.search} ${styles.__focus}`}>
                        <i className={`${styles.search_icon} ${styles.__focus}`} />
                        <input className={`${styles.search_input}`}
                            placeholder='Search'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {/* <div style={{width: '100%', height: '50px', backgroundColor: 'red'}}></div> -- user search, to be added soon*/}
            </>
            :
                <div className={`${styles.list_header}`}>
                    <div className={`${styles.logo}`} />
                    <div className={`${styles.search}`}>
                        <i className={`${styles.search_icon}`} onClick={toggleFocus} />
                    </div>
                </div>
    )
}

export default ChatListHeader;
