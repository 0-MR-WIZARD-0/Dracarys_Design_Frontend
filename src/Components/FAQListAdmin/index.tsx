import React from 'react'
import styles from '@/app/global_styles/admin_page/adminPage.module.scss';
import { FAQ } from '@/Pages/admin_page';

interface FAQListProps {
  faq: FAQ[];
  onDelete: (id: number) => void;
}

const FAQListAdmin: React.FC<FAQListProps> = ({ faq, onDelete }) => {
  return (
    <div className={styles.view_projects}>
      {faq.length > 0 ? (
        faq.map((elem) => (
          <div key={elem.id} className={styles.element}>
            <div className={styles.info}>
                <p>Вопрос: {elem.question}</p>
                <p>Ответ: {elem.answer}</p>
            </div>
            <div className={styles.buttons}>
                <button>Редактировать</button>
                <button onClick={() => onDelete(elem.id)}>Удалить</button>
            </div>
          </div>
        ))
      ) : (
        <p>FAQ еще не добавлены.</p>
      )}
    </div>
  )
}

export default FAQListAdmin