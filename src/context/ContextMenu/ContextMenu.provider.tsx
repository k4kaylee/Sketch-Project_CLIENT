import React, { useCallback, useState, useEffect } from 'react';
import { FC, PropsWithChildren } from 'react';
import { ContextMenu, MenuItem } from './ContextMenu.context.ts';
import './ContextMenu.css'



export const ContextMenuProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [items, setItems] = useState<MenuItem[]>([])
    const [coordinates, setCoordinates] = useState<number[]>([])
    const [isVisible, setIsVisible] = useState(false);

    const setContextMenu = useCallback((items: MenuItem[], coordinates: number[]) => {
        setItems(items);
        setCoordinates(coordinates);
        setIsVisible(true);
    }, [])

    useEffect(() => {
        console.log(items, coordinates);
    }, [items, coordinates])

    // const toggleClass = () => {

    // }

    return (
        <ContextMenu.Provider value={{ setContextMenu }}>
            {!!coordinates && (
                <div className={isVisible ? 'contextMenu' : ''}
                     style={{left: coordinates[0], top: coordinates[1], animation: 'pop-up 3s'}}
                    >
                    {items.map((item, i) => (
                        <div className='contextMenuItem'
                             key={i}
                             onClick={item.onClick}
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