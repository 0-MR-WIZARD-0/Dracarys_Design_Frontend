"use client"

import React from 'react'
import styles from "@/Components/Footer/footer.module.scss"
import { useQRCode } from 'next-qrcode'

const Footer = () => {

  const {Canvas} = useQRCode()

  return (
    <footer id='footer'>
        <div className={styles.wrapper_footer}>
            <div className={styles.footer_info}>
                <div>
                  <Canvas
                    text='https://t.me/dracarys_design'
                  />
                </div>
                <div className={styles.footer_content}>
                    <h2>DRACARYS DESIGN</h2>
                    <p>Кастомизация, дизайн и веб-разработка для уникальных проектов</p>
                </div>
            </div>
            <p>По вопросам сотрудничества: dracarys_design@ya.ru</p>
        </div>
    </footer>
  )
}

export default Footer