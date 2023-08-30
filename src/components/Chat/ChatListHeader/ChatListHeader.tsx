import React, { useEffect, useState } from 'react';
import styles from './ChatListHeader.module.css'
import '../../../App.css'
import axios from '../../../api/axios';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';


interface UserItem{
    avatar: File,
    username: string
}


const ChatListHeader = ({search}) => {

    const MAX_USERNAME_LENGTH = 8;
    const [focus, setFocus] = useState(false);
    const [users, setUsers] = useState([])
    const setSearch = search;

    const loadUsers = async () => {
        try {
          const response = await axios.get(`/users`);
          if (response.status === 200) {
            setUsers(response.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      }

    useEffect(() => {
        if(focus)
            loadUsers();
    }, [focus])
    

    const toggleFocus = () => {
        setFocus(!focus);
    };

    return (
        focus ?
          <>
            <div className={`${styles.list_header} ${styles.scroll}`}>
              <i className={`${styles.arrow_back_icon}`} onClick={toggleFocus} />
              <div className={`${styles.search} ${styles.__focus}`}>
                <i className={`${styles.search_icon} ${styles.__focus}`} />
                <input className={`${styles.search_input}`}
                  placeholder='Search'
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className={`${styles.users_tab}`}>
                {users.map((user, i) => {
                    let truncatedName = user.name;
                    if(truncatedName.length > MAX_USERNAME_LENGTH)
                        truncatedName = truncatedName.slice(0, MAX_USERNAME_LENGTH) + "...";
                    return (
                        <div className={`${styles.user}`} key={i}>
                            <div className={`${styles.avatar} ${styles.diminished}`} />
                            <div className={`${styles.username}`}>{truncatedName}</div>
                        </div>
                    )
                })}
            </div>
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
