import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addCart, deleteCart } from '../../store/cartSlice';
import { useAppDispatch } from '../../handlers/reduxHooks/reduxHooks';
import Comments from '../../features/Comments/Index';
import { Product } from '../../interfaces/interface';
import {
  useGetProductCardQuery,
  useToggleLikeMutation,
} from '../../store/productCardApi';
import { Spin } from 'antd';

import styles from './index.module.scss';

const CardInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productId = id || '';

  const { data: product, error, isLoading } = useGetProductCardQuery(productId);
  const [toggleLike] = useToggleLikeMutation();

  const handleLikeToggle = async (productId: string, currentLike: boolean) => {
    try {
      await toggleLike({
        id: productId,
        like: !currentLike,
      }).unwrap();
    } catch (error) {
      console.error('Ошибка при переключении лайка', error);
    }
  };

  const returnToCard = () => {
    navigate(-1);
  };

  const addToCart = (product: Product) => {
    if (product) {
      return dispatch(addCart(product));
    }
  };

  const deletetoCart = (id: string) => {
    dispatch(deleteCart(id));
  };

  if (!product) {
    return <div className={styles.error}>Загрузка продукта</div>;
  }

  const {
    title,
    description,
    price,
    accum,
    memory,
    photo,
    like,
    quantity,
    addedToCart,
    rating,
  } = product;

  return (
    <div className={styles.CardInfo}>
      <Spin spinning={isLoading} tip='Загрузка...'>
        {error && <div className={styles.error}>Ошибка загрузки продукта</div>}
        <div className={styles.CardInfoHeader}>
          <h2 className={styles.CardInfoTitle}>Информация о товаре</h2>
          <button className={styles.CardInfoBack} onClick={returnToCard}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 15v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h6v6h-6z' />
              <path d='M21 15v-6' />
            </svg>
            <span>Назад </span>
          </button>
        </div>
        {
          <div className={styles.CardInfoWrapper}>
            <h3 className={styles.CardInfoTitle}>{title}</h3>
            <p className={styles.CardInfoDescription}>{description}</p>
            <div className={styles.CardInfoBlock}>
              <img className={styles.CardInfoImage} src={photo} alt='photo' />
              <div className={styles.CardInfoText}>
                <p className={styles.CardInfoAccum}>Аккумулятор: {accum}</p>
                <p className={styles.CardInfoMemory}>Обьем памяти: {memory}</p>
                <p className={styles.CardInfoRating}>Рейтинг: {rating}</p>
                <p
                  className={
                    quantity === 0
                      ? styles.CardInfoQuantityError
                      : styles.CardInfoQuantity
                  }
                >
                  {quantity === 0 ? 'Нет в наличии' : `Количество: ${quantity}`}{' '}
                </p>
                <p className={styles.CardInfoPrice}>Цена: {price}</p>
              </div>
            </div>

            <div className={styles.CardInfoBtnWrapper}>
              <button
                className={
                  like ? styles.CardInfoBtnEditActive : styles.CardInfoBtnEdit
                }
                onClick={() => handleLikeToggle(id!, like)}
              >
                <svg
                  className={styles.CardLike}
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
                </svg>

                {like ? (
                  <span>В избранном</span>
                ) : (
                  <span>Добавить в избранное</span>
                )}
              </button>

              <button
                className={styles.CardInfoAddtoCart}
                disabled={quantity === 0}
                onClick={() =>
                  addedToCart ? deletetoCart(id!) : addToCart(product)
                }
              >
                <span>
                  {addedToCart ? 'Удалить из корзины' : 'Добавить в корзину'}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M17 10l-2 -6' />
                  <path d='M7 10l2 -6' />
                  <path d='M11 20h-3.756a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304h13.999a2 2 0 0 1 1.977 2.304l-.479 2.729' />
                  <path d='M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
                  <path d='M15 19l2 2l4 -4' />
                </svg>
              </button>
            </div>
          </div>
        }
        <Comments productId={id ? id : ''} />
      </Spin>
    </div>
  );
};

export default CardInfo;
