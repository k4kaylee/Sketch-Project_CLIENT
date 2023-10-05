import React, { FC, useEffect, useState } from 'react';
import styles from './Notice.module.css';

interface NoticeProps {
    content: string;
}

const Notice: FC<NoticeProps> = ({ content }) => {
    const [isVisible, setIsVisible] = useState<boolean>(Boolean(content));

    useEffect(() => {
        if (content) {
            setIsVisible(true);

            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => {
                clearTimeout(timeout);
                setIsVisible(false);
 
            };
        }
    }, [content]);

    return (
        isVisible ? (
            <div className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}>
                <div className={`${styles.notification} ${styles.unselectable}`}>
                    <p>{content}</p>
                </div>
            </div>
        ) : (
            <></>
        )
    );
};

export default Notice;
