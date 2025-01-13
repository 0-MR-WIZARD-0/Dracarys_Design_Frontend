import React, { useState } from 'react';
import styles from '@/app/global_styles/admin_page/adminPage.module.scss';
import { FAQ } from '@/types/faq';
import Pagination from '@/Components/Pagination';

interface FAQListProps {
  faq: FAQ[];
  onDelete: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit: (type: "faq", data: any) => void;
}

const FAQListAdmin: React.FC<FAQListProps> = ({ faq, onDelete, onEdit }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(faq.length / itemsPerPage);

  const currentPageData = faq.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.view_projects}>
      {currentPageData.length > 0 ? (
        currentPageData.map((elem) => (
          <div key={elem.id} className={styles.element}>
            <div className={styles.info}>
              <p>Вопрос: {elem.question}</p>
              <p>Ответ: {elem.answer}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit("faq", elem)}>Редактировать</button>
              <button onClick={() => onDelete(elem.id)}>Удалить</button>
            </div>
          </div>
        ))
      ) : (
        <p>FAQ еще не добавлены.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FAQListAdmin;
