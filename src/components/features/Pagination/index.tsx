import React, { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import styles from './index.module.scss';
import { CardContextType } from '../../interfaces/interface';
const Pagination: React.FC<{ totalCards: number }> = ({
  totalCards,
}: {
  totalCards: number;
}) => {
  const { currentPage, cardsPerPage, paginate } = useContext(
    CardContext
  ) as CardContextType;

  const pageNumber: number[] = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className={styles.Pagination}>
      <ul className={styles.PaginationList}>
        {pageNumber.map((number) => (
          <li key={number} className={styles.PaginationItem}>
            <button
              disabled={currentPage === number}
              className={
                currentPage === number
                  ? styles.PaginationLinkActive
                  : styles.PaginationLink
              }
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
