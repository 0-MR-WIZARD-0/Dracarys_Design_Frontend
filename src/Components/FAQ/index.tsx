"use client"

import styles from "@/Components/FAQ/faq.module.scss"
import { useEffect, useState } from "react"
import { fetchFAQ } from "@/services/api"

const FAQ = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [faqList, setFaqList] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState<number | null>(null)

  const toggleOpen = (id: number) => {
    setIsOpen(isOpen === id ? null : id)
  }

  const loadFAQ = async () => {
    const data = await fetchFAQ()
    setFaqList(data)
  }

  useEffect(() => {
    loadFAQ()
  }, [])

  return (
    <section id="faq" style={{ position: "relative", zIndex: "4" }}>
      <div className={styles.wrapper_faq}>
        <div>
          <h2>FAQ</h2>
          <hr />
        </div>
        <div className={styles.faq_questions}>
          {faqList.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            faqList.map((faq: any) => (
              <div key={faq.id} className={styles.question}>
                <button
                  onClick={() => toggleOpen(faq.id)}
                  className={`${styles.question_button}`}
                >
                  <p>{faq.question}</p>
                </button>
                {isOpen === faq.id && (
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>{`Записи в блоке "Вопрос - Ответ' - отсутствуют`}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default FAQ
