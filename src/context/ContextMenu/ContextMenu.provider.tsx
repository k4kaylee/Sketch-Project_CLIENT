import React, { useCallback, useState, useEffect, useRef } from 'react';
import { FC, PropsWithChildren } from 'react';
import { ContextMenu, MenuItem } from './ContextMenu.context.ts';
import './ContextMenu.css'



export const ContextMenuProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [items, setItems] = useState<MenuItem[]>([])
    const [coordinates, setCoordinates] = useState<number[]>([])
    const [message, setMessage] = useState<object>({});
    const [isVisible, setIsVisible] = useState(true);

    const menuRef = useRef(null);

    const preventOutOfBounds = useCallback((coordinates: number[]) => {
        const menuRect = {
            width: 130,
            height: 100 
        }
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const messageInputHeight = 80;

        let newX = coordinates[0];
        let newY = coordinates[1];

        newX = Math.min(newX, viewportWidth - menuRect.width - 40);
        newY = Math.min(newY, viewportHeight - menuRect.height - messageInputHeight);
        newX = Math.max(newX, 0);
        newY = Math.max(newY, 0);

        const newCoordinates = [newX, newY]
        return newCoordinates;
    }, [])

    const setContextMenu = useCallback((items: MenuItem[], coordinates: number[], message: object) => {
        setItems(items);
        setCoordinates(preventOutOfBounds(coordinates));
        setIsVisible(true);
        setMessage(message);
    }, [preventOutOfBounds ])


    useEffect(() => {
        const handleClickBeyondContext = () => {
            setIsVisible(false);
        };

        if (isVisible) {
            document.body.addEventListener('click', handleClickBeyondContext);
        } else {
            document.body.removeEventListener('click', handleClickBeyondContext);
        }

        return () => {
            document.body.removeEventListener('click', handleClickBeyondContext);
        };
    }, [isVisible])



    return (
        <ContextMenu.Provider value={{ setContextMenu }}>
            {!!coordinates && (
                <div className={`contextMenu ${isVisible ? 'visible' : ''}`}
                    style={{ left: coordinates[0], top: coordinates[1] }}
                    ref={menuRef}
                >
                    {items.map((item, i) => (
                        <div className={`contextMenuItem ${isVisible ? 'visible' : ''}`}
                            key={i}
                            onClick={item.onClick.bind(null, message)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )
            }
            {children}
        </ContextMenu.Provider>
    )
}