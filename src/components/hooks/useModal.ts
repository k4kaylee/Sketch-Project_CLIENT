import { ModalContext } from "../../context/Modal/Modal.context.tsx";
import { useContext } from 'react'

export const useModal = () => useContext(ModalContext);
