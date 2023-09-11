import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <section className={`${styles.loader_background}`}>
        <span className={`${styles.loader}`} ></span>
    </section>
  )
}

export default Loader;