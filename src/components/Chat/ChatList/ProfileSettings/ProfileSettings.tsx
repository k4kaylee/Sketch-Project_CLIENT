import React, { useContext } from 'react'
import styles from './ProfileSettings.module.css'
import { AuthContext } from '@/context/AuthContext'

const ProfileSettings = ({ setIsProfileSettingsVisible }) => {

    const { handleLogout } = useContext(AuthContext);
    const closeProfile = () => {
        setIsProfileSettingsVisible(false);
    }

    return (
        <>
            <header className={styles.profile_header}>
                <i className={styles.arrow_back_icon} onClick={closeProfile} />
            </header>
            <div className={styles.profile_avatar}>
                <div className={styles.card}>
                    <div className={styles.username}>Raman</div>
                    <div>last active: today</div>
                </div>
            </div>
            <button className={styles.logout_button} onClick={handleLogout}>
                <i className={styles.logout_icon} />
                <div>Log out</div>
            </button>
        </>
    )
}

export default ProfileSettings;