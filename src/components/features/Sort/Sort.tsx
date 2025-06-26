import React from 'react';
import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import { CardContextType } from '../../interfaces/interface';
import styles from './Sort.module.scss';

type SortProps = {};

type SortState = 'asc' | 'desc';

export const Sort: React.FC<SortProps> = () => {
  const { searchParams, handleChangeFilters } = useContext(
    CardContext
  ) as CardContextType;
  const currentSort: SortState = (searchParams.get('sort') as SortState) || '';

  // Функция для установки сортировки
  const setSort = (newSort: string | null) => {
    handleChangeFilters('sort', newSort);
  };
  return (
    <div className={styles.Sort}>
      <div className={styles.SortContainer}>
        <span className={styles.SortTitle}>Сортировка по цене :</span>
        <div className={styles.SortOptions}>
          <button
            className={
              currentSort === 'asc' ? styles.SortValueActive : styles.SortValue
            }
            onClick={() => setSort('asc')}
          >
            По возрастанию
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z' />
            </svg>
          </button>
          <button
            className={
              currentSort === 'desc' ? styles.SortValueActive : styles.SortValue
            }
            onClick={() => setSort('desc')}
          >
            По убыванию
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
