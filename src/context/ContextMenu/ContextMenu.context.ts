import { createContext } from 'react';

export interface MenuItem {
    name: string,
    onClick: () => void;
}

interface Menu {
    setContextMenu: (items: MenuItem[], coordinates: number[], message: object) => void;
}

export const ContextMenu = createContext<Menu>({
    setContextMenu: () => {}
});  

