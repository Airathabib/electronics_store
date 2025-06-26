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

  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const visiblePages = 2; // Количество страниц вокруг текущей
  const maxButtons = 6; // Максимальное количество отображаемых кнопок

  const generatePages = () => {
    const pages: (number | '...')[] = [];

    // Добавляем первую страницу
    pages.push(1);

    // Добавляем эллипс, если текущая страница далеко от начала
    if (currentPage > visiblePages + 2) {
      pages.push('...');
    }

    // Определяем диапазон страниц для отображения
    const start = Math.max(1, currentPage - visiblePages);
    const end = Math.min(totalPages, currentPage + visiblePages);

    // Добавляем страницы вокруг текущей
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Если превышаем лимит кнопок - оптимизируем
    if (pages.length > maxButtons) {
      const optimizedPages: (number | '...')[] = [];

      // Всегда показываем первую страницу
      optimizedPages.push(1);

      // Добавляем эллипс если есть разрыв
      if (currentPage > 2) {
        optimizedPages.push('...');
      }

      // Добавляем текущую страницу и соседние
      optimizedPages.push(currentPage - 1);
      optimizedPages.push(currentPage);
      optimizedPages.push(currentPage + 1);

      // Добавляем эллипс если есть разрыв
      if (currentPage < totalPages - 1) {
        optimizedPages.push('...');
      }

      // Всегда показываем последнюю страницу
      optimizedPages.push(totalPages);

      // Удаляем дубликаты и лишние элементы
      return [...new Set(optimizedPages)].slice(0, maxButtons);
    }

    // Добавляем последнюю страницу, если она не уже в списке
    if (totalPages !== 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className={styles.Pagination}>
      <ul className={styles.PaginationList}>
        {pages.map((item, index) => {
          const key = typeof item === 'number' ? item : `ellipsis-${index}`;

          if (typeof item === 'number') {
            return (
              <li key={key} className={styles.PaginationItem}>
                <button
                  disabled={currentPage === item}
                  className={
                    currentPage === item
                      ? styles.PaginationLinkActive
                      : styles.PaginationLink
                  }
                  onClick={() => paginate(item)}
                >
                  {item}
                </button>
              </li>
            );
          } else {
            return (
              <li
                key={key}
                className={`${styles.PaginationItem} ${styles.disabled}`}
              >
                <span className={styles.Ellipsis}>...</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Pagination;
