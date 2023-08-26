import React, { FC, useRef } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
    header: string,
    content: string,
    setShowModal: Function,
    deleteMessage: Function 
}


const Modal: FC<ModalProps> = ({ header, content, setShowModal, deleteMessage }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    const dissapear = () => {
        modalRef.current.classList.add(styles.pop_back);
        backgroundRef.current.classList.add(styles.fade_away);
        setTimeout(() => {
            setShowModal(false);
        }, 400);
    };

    const onDelete = () => {
        dissapear();
    }

    const onCancel = () => {
        dissapear();
    }

    return (
        <div className={`${styles.modal_background}`}
            ref={backgroundRef}
        >
            <div className={`${styles.modal}`}
                ref={modalRef}
            >
                <h2>{header}</h2>
                <p>{content}</p>
                <div className={`${styles.button_container}`}>
                    <button className={`${styles.delete}`} onClick={onDelete}>Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;