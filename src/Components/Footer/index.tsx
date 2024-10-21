import React from 'react'
import styles from "@/Components/Footer/footer.module.scss"

const Footer = () => {
  return (
    <footer>
        <div className={styles.wrapper_footer}>
            <div className={styles.footer_info}>
                <div></div>
                <div>
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