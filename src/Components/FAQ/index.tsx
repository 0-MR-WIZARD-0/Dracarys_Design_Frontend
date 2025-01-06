"use client"

import styles from "@/Components/FAQ/faq.module.scss"
import { useEffect, useState } from "react"
import { fetchFAQ } from "@/services/api/api"
import type { FAQ } from "@/types/faq"
import Pagination from "@/Components/Pagination"

const FAQ = () => {
  const [faqList, setFaqList] = useState<FAQ[]>([])
  const [isOpen, setIsOpen] = useState<number | null>(null)
  
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalPages = Math.ceil(faqList.length / itemsPerPage)

  const currentPageData = faqList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <section id="faq" style={{ position: "relative", zIndex: "4" }}>
      <div className={styles.wrapper_faq}>
        <div>
          <h2>FAQ</h2>
          <hr />
        </div>
        <div className={styles.faq_questions}>
          {currentPageData.length > 0 ? (
            currentPageData.map((faq: FAQ) => (
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
            <p>Записи в блоке &quot;Вопрос - Ответ&quot; отсутствуют</p>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </section>
  )
}

export default FAQ
