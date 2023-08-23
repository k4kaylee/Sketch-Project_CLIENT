import React, { useEffect, useState } from 'react';
import './Notice.css';

const Notice = ({ content }) => {
    const [isVisible, setIsVisible] = useState(Boolean(content));

    useEffect(() => {
        if (content) {
            setIsVisible(true);

            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [content]);

    return (
        content ? (
            <div className={`container ${isVisible ? 'visible' : 'hidden'}`}>
                <div className='notification unselectable'>
                    {/*<icon></icon>*/}
                    <p>{content}</p>
                </div>
            </div>
        ) 
            : 
        <></>
    );
};

export default Notice;
