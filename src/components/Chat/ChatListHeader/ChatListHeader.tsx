import React, { useEffect, useState } from 'react';
import styles from './ChatListHeader.module.css'
import '../../../App.css'
import axios from '../../../api/axios';


interface User {
  avatar: File,
  name: string
}


const ChatListHeader = ({ search, setSearch, openChat }) => {

  const MAX_USERNAME_LENGTH = 8;
  const [focus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersTabContent, setUsersTabContent] = useState<User[]>([]);

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
    if (focus)
      loadUsers();
  }, [focus])

  useEffect(() => {
    handleSearch();
  }, [search, users])

  const handleSearch = () => {
    if (!search) {
      setUsersTabContent(users);
      return;
    }
    const result = users.filter((user) => {
      console.log(user)
      return user.name.toLowerCase().includes(search.toLowerCase());
    });
    setUsersTabContent(result);
  }


  const toggleFocus = () => {
    setFocus(!focus);
    setSearch('');
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
          {usersTabContent.map((user, i) => {
            let truncatedName = user.name;
            if (truncatedName.length > MAX_USERNAME_LENGTH)
              truncatedName = truncatedName.slice(0, MAX_USERNAME_LENGTH) + "...";
            return (
              <div className={`${styles.user}`} key={i} onClick={() => openChat(user)}>
                <div className={`${styles.avatar} ${styles.diminished}`} />
                <div className={`${styles.username} ${styles.unselectable}`}>{truncatedName}</div>
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


