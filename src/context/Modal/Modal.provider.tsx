import React, { FC, PropsWithChildren, useRef, useState } from 'react'
import styles from './Modal.module.css'
import { ModalContext, ModalProps } from './Modal.context';


export const ModalProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [props, setProps] = useState<ModalProps>();
    const modalRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    const dissapear = () => {
        if (modalRef.current) {
            modalRef.current.classList.add(styles.pop_back);
        }
        if (backgroundRef.current) {
            backgroundRef.current.classList.add(styles.fade_away);
        }
        setTimeout(() => {
            if (props) {
                setProps(null);
            }
        }, 400);
    };

    const onSubmit = () => {
        dissapear();
        props.onSubmit();
    };

    const onCancel = () => {
        dissapear();
    };

    return (
        <ModalContext.Provider value={{ setModal: setProps }}>
          {props && (
            <div className={`${styles.modal_background}`} ref={backgroundRef}>
                <div className={`${styles.modal}`} ref={modalRef}>
                    <h2>{props.header}</h2>
                    <p>{props.content}</p>
                    <div className={`${styles.button_container}`}>
                        <button className={`${styles.modal_button} ${styles.delete}`} onClick={onSubmit}>Delete</button>
                        <button className={`${styles.modal_button}`} onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
        {children}
        </ModalContext.Provider>
    );
};