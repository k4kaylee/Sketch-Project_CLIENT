import { ModalContext } from "../../context/Modal/Modal.context.ts";
import { useContext } from 'react'

export const useModal = () => useContext(ModalContext);
