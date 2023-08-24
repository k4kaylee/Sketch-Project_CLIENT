import React, { FC } from 'react'
import './Modal.css'

interface ModalProps {
    header: string,
    content: string,
}

const Modal: FC<ModalProps> = ({ header, content }) => {
    return (
        <div className='modal-background'>
            <div>
                <h2>{header}</h2>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Modal;