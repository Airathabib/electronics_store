import React from 'react';
import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import useCartList from '../../handlers/hooks/useCartList';
import CardListRenderer from '../../handlers/CardListRender/CardListRender';
import LoadingErrorHandler from '../../handlers/LoadingErrorHandler/LoadingErrorHandler';
import { Sort } from '../../features/Sort/Sort';
import useFilteredList from '../../handlers/hooks/useFilteredList';
import CategoryTitle from '../../features/CategoryTitle';
import Pagination from '../../features/Pagination';
import { CardContextType } from '../../interfaces/interface';
import { Spin } from 'antd';
import { LeftBtn } from '../../features/LeftBtn';
import { RightBtn } from '../../features/RightBtn';
import styles from './index.module.scss';

const Cart: React.FC = () => {
  const { category, currentPage, firstCardIndex, lastCardIndex, paginate } =
    useContext(CardContext) as CardContextType;

  const { error, loading, cart } = useCartList();

  const { data: filteredArr } = useFilteredList(cart);

  const currentCards = filteredArr.slice(firstCardIndex, lastCardIndex);


  const productCount = cart.reduce((acc, product) => acc + product.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  return (
    <div className={styles.Cart}>
      {cart.length > 0 && <Sort />}
      <LoadingErrorHandler loading={loading} error={error} />
      {!loading && !error && filteredArr.length > 0 && (
        <CategoryTitle category={category} filteredArr={filteredArr} />
      )}

      <div className={styles.CartHeader}>
        {cart.length > 0 && (
          <>
            <h3 className={styles.CartTitle}>
              Товаров в корзине: {productCount}
            </h3>
            <h3 className={styles.CartTitle}>На сумму: {totalPrice} руб.</h3>
          </>
        )}
      </div>
      {cart.length === 0 && (
        <div className={styles.error}>В корзине нет товаров</div>
      )}
      {loading && !error && <div className={styles.loading}>Загрузка...</div>}
      {error && (
        <div className={styles.error}>
          Произошла ошибка при ответе от сервера: {error}
        </div>
      )}
      <Spin spinning={loading} tip='Загрузка...'>
        <div className={styles.CartWrapper}>
          {!loading && !error && (
            <CardListRenderer
              products={currentCards}
              loading={false}
              error={null}
            />
          )}
        </div>
      </Spin>

      {currentCards.length > 0 ? (
        <div className={styles.PaginationWrapper}>
          <button
            className={styles.PaginationBtn}
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <LeftBtn />
          </button>
          <Pagination totalCards={filteredArr.length} />
          <button
            className={styles.PaginationBtn}
            disabled={filteredArr.length <= lastCardIndex}
            onClick={() => paginate(currentPage + 1)}
          >
            <RightBtn />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Cart;
