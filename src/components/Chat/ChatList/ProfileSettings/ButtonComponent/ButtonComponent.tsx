import React from 'react'
import styles from './ButtonComponent.module.css'

interface ButtonProps {
    icon?: string;
    content: string;
    color?: string;
    clickFunction: () => void;
    style?: Object,
}

function ButtonComponent({ icon, content, color, clickFunction, style }: ButtonProps) {
    return (
        <button className={styles.button} style={style} onClick={clickFunction}>
            <i className={`${styles.icon} ${styles[icon]}`} />
            <div className={styles.content} style={{ color: `${color ? color : "#BCC0C4"}` }}>
                {content}
            </div>
        </button >
    )
}

export default ButtonComponent