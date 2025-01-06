import styles from "./pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => goToPage(currentPage - 1)} className={styles.pagination_button}>
          {"<"}
        </button>
      )}

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`${styles.pagination_button} ${currentPage === index + 1 ? styles.active : ""}`}
        >
          {index + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => goToPage(currentPage + 1)} className={styles.pagination_button}>
          {">"}
        </button>
      )}
    </div>
  );
};

export default Pagination;
