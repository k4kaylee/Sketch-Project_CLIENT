import { createContext } from 'react';

export interface ModalProps {
    header: string,
    content: string,
    onSubmit: Function
}

interface Modal{
    setModal: Function,
}

export const ModalContext = createContext<Modal>({
    setModal: () => {}
});  

