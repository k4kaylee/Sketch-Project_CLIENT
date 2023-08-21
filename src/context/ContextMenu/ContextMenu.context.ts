import { createContext } from 'react';

export interface MenuItem {
    name: string,
    onClick: () => void;
}

interface Menu {
    setContextMenu: (items: MenuItem[], coordinates: number[]) => void;
}

export const ContextMenu = createContext<Menu>({
    setContextMenu: () => {}
});  

