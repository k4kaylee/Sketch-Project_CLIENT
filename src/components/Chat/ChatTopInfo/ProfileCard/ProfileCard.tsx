import React, { useEffect } from 'react';
import styles from './ProfileCard.module.css';
import SimpleBar from 'simplebar-react';

// type ProfileCardData = {
//     avatar: string;
//     user: 
// }

const ProfileCard = ({ intelocutorStatus, intelocutor })/*: ProfileCardData*/ => {

    return (
        <>
            <div className={`${styles.background}`}>
                <div className={`${styles.card}`} onClick={(event) => event.stopPropagation()}>
                    <SimpleBar className='scroll' style={{ height: '82vh' }}>
                        <div className={styles.flex_container}>
                            <div className={styles.avatar} />
                            <div className={styles.preview}>
                                <article className={`${styles.username} ${styles.unselectable}`}>{intelocutor}</article>
                                <article className={styles.unselectable}>{intelocutorStatus}</article>
                            </div>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </>
    )
}

export default ProfileCard