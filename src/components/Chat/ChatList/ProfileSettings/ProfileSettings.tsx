import React, { useContext, useEffect, useState, useRef } from 'react'
import styles from './ProfileSettings.module.css'
import { AuthContext } from '@/context/AuthContext'
import useUser from '@/components/hooks/useUser'
import ButtonComponent from './ButtonComponent/ButtonComponent'

interface UserData {
    name: string,
    status: string,
    avatar?: string,
}

const ProfileSettings = ({ setIsProfileSettingsVisible }) => {

    const { handleLogout, user } = useContext(AuthContext);
    const [userData, setUserData] = useState<UserData>();
    const profileRef = useRef<HTMLDivElement>();
    const { loadUserById } = useUser();
    const closeProfile = () => {
        if (profileRef.current) {
            profileRef.current.classList.add(`${styles.dissapear}`);
        }
        setTimeout(() => {
            setIsProfileSettingsVisible(false);
        }, 150)

    }

    useEffect(() => {
        const fetchUser = async () => {
            await loadUserById(user.id, setUserData);
        };

        fetchUser();
    }, [user, loadUserById, setUserData]);

    return (
        <div className={styles.profile} ref={profileRef}>
            <header className={styles.profile_header}>
                <i className={styles.arrow_back_icon} onClick={closeProfile} />
            </header>
            <div className={styles.profile_avatar}>
                <div className={`${styles.card} ${styles.unselectable}`}>
                    <div className={styles.username}>{userData?.name}</div>
                    <div>{userData?.status}</div>
                </div>
            </div>
            <div className={styles.button_container}>
                <ButtonComponent icon='settings' content='Settings' clickFunction={() => alert('To be implemented')} />
                <ButtonComponent icon='edit' content='Edit Profile Data' clickFunction={() => alert('To be implemented')} />
                <ButtonComponent icon='exit' content='Log Out' color="#e93535" clickFunction={handleLogout} style={{ marginTop: 'auto' }} />
            </div>
        </div>
    )
}

export default ProfileSettings;