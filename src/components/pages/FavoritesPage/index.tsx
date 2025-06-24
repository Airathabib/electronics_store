import { useContext } from 'react';
import useProductList from '../../handlers/hooks/useProductList';
import { CardContext } from '../../Context/Context';
import CardListRenderer from '../../handlers/CardListRender/CardListRender';
import LoadingErrorHandler from '../../handlers/LoadingErrorHandler/LoadingErrorHandler';
import useFilteredList from '../../handlers/hooks/useFilteredList';
import CategoryTitle from '../../features/CategoryTitle';
import Pagination from '../../features/Pagination';
import { Sort } from '../../features/Sort/Sort';
import { CardContextType } from '../../interfaces/interface';

import styles from './index.module.scss';
import { Spin } from 'antd';

const Favorites: React.FC = () => {
  const { error, isLoading, products } = useProductList();
  const { category, currentPage, firstCardIndex, lastCardIndex, paginate } =
    useContext(CardContext) as CardContextType;

  const favoriteProducts = products.filter((product) => product.like);

  const { data: filteredArr } = useFilteredList(favoriteProducts);

  const currentCards = filteredArr.slice(firstCardIndex, lastCardIndex);

  return (
    <div className={styles.Favorites}>
      <Sort />
      <LoadingErrorHandler loading={isLoading} error={error} />
      {!isLoading && !error && currentCards.length > 0 && (
        <CategoryTitle category={category} filteredArr={filteredArr} />
      )}
      {!isLoading &&
        !error &&
        Array.isArray(filteredArr) &&
        filteredArr.length === 0 && (
          <div className={styles.NotFavorites}>
            Нет избранных товаров для отображения
          </div>
        )}
      <Spin spinning={isLoading} tip='Загрузка...'>
        <div className={styles.FavoritesListWrapper}>
          {!isLoading && !error && (
            <CardListRenderer
              products={currentCards}
              loading={false}
              error={null}
            />
          )}
        </div>
      </Spin>
      {currentCards.length ? (
        <div className={styles.PaginationWrapper}>
          <button
            className={styles.PaginationBtn}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            {' '}
            Назад{' '}
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
      ) : (
        ''
      )}
    </div>
  );
};

export default Favorites;
