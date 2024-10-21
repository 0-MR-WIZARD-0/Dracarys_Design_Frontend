"use client"

import styles from "@/Components/FAQ/faq.module.scss"
import { useState, useEffect } from "react"

const FAQ = () => {

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section>
      <div className={styles.wrapper_faq}>
        <div>
          <div>
            <h2>FAQ</h2>
          </div>
        </div>
        <div className={styles.faq_questions}>
          <div className={styles.question}>
            <button onClick={toggleOpen} className={`${styles.question_button}`}><p>Какие материалы вы используете для кастомизации?</p></button>
            {isOpen && <div className={styles.answer}>
                <p>Да, вы можете узнать статус выполнения вашего заказа, 
                обратившись к нам в Telegram. Как только заказ будет отправлен, 
                мы пришлем вам трек-номер СДЭК для отслеживания доставки.
                </p>
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ