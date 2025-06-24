import { useContext } from 'react';
import useProductList from '../../handlers/hooks/useProductList';
import CategoryTitle from '../../features/CategoryTitle';
import useFilteredList from '../../handlers/hooks/useFilteredList';
import LoadingErrorHandler from '../../handlers/LoadingErrorHandler/LoadingErrorHandler';
import CardListRenderer from '../../handlers/CardListRender/CardListRender';
import { CardContext } from '../../Context/Context';
import Pagination from '../../features/Pagination';
import { Sort } from '../../features/Sort/Sort';
import { CardContextType } from '../../interfaces/interface';
import { Spin } from 'antd';

import styles from './index.module.scss';

const CardList: React.FC = () => {
  const { searchParams, currentPage, firstCardIndex, lastCardIndex, paginate } =
    useContext(CardContext) as CardContextType;

  const { error, isLoading, products } = useProductList();

  const category = searchParams.get('category') || '';

  // Проверяем наличие продуктов перед фильтрацией
  const { data: filteredArr } = useFilteredList(products || []);

  const currentCards = filteredArr?.slice(firstCardIndex, lastCardIndex) || [];

  return (
    <div className={styles.CardList}>
      <Sort />
      <LoadingErrorHandler loading={isLoading} error={error} />
      {!isLoading && !error && (
        <>
          {filteredArr.length > 0 && (
            <CategoryTitle category={category} filteredArr={filteredArr} />
          )}
          {filteredArr.length === 0 && (
            <div className={styles.error}>
              Нет товаров для отображения{' '}
              {category ? `категории ${category}` : 'выбранной категории'}
            </div>
          )}
          <Spin spinning={isLoading} tip='Загрузка...'>
            <div className={styles.CardListWrapper}>
              {filteredArr.length > 0 && (
                <CardListRenderer
                  products={currentCards}
                  loading={false}
                  error={null}
                />
              )}
            </div>
          </Spin>

          <div className={styles.PaginationWrapper}>
            <button
              className={styles.PaginationBtn}
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Назад
            </button>
            <Pagination totalCards={filteredArr.length} />
            <button
              className={styles.PaginationBtn}
              disabled={filteredArr.length <= lastCardIndex}
              onClick={() => paginate(currentPage + 1)}
            >
              Вперед
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
