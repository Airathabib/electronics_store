import React, { memo } from 'react';
import { useAppDispatch } from '../../handlers/reduxHooks/reduxHooks';
import { useToggleLikeMutation } from '../../store/productApi';
import { addCart, deleteCart, updateProductCart } from '../../store/cartSlice';
import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';
import { Cart, Product } from '../../interfaces/interface';

const Card: React.FC<Product> = memo(
  ({
    id,
    title,
    description,
    price,
    accum,
    memory,
    photo,
    like,
    quantity,
    brand,
    addedToCart,
    category,
    rating,
  }: Product) => {
    const product = {
      id,
      title,
      description,
      price,
      accum,
      memory,
      photo,
      like,
      quantity,
      brand,
      addedToCart,
      category,
      rating,
    };
    const dispatch = useAppDispatch();
    const [toggleLike] = useToggleLikeMutation();

    const handleLikeToggle = async (
      productId: string,
      currentLike: boolean
    ) => {
      try {
        await toggleLike({
          id: productId,
          like: !currentLike,
        }).unwrap();
      } catch (error) {
        console.error('Ошибка при переключении лайка', error);
      }
    };

    const addToCart = (product: Product) => {
      return dispatch(addCart(product));
    };

    const deletetoCart = (id: string) => {
      dispatch(deleteCart(id));
    };

    const handleProductQuantityPlus = (product: Cart, quantity: number) => {
      dispatch(
        updateProductCart({
          ...product,
          quantity: quantity + 1,
        })
      );
    };

    const handleProductQuantityMinus = (product: Product, quantity: number) => {
      if (quantity > 1) {
        dispatch(
          updateProductCart({
            ...product,
            quantity: quantity - 1,
          })
        );
      } else {
        dispatch(deleteCart(product.id));
      }
    };
    return (
      <div className={quantity === 0 ? styles.CardError : styles.Card}>
        <h4 className={styles.CardTitle}>{title}</h4>
        <h3 className={styles.CardBrand}>Бренд: {brand}</h3>
        <p className={styles.CardDescr}> {description}</p>
        <p className={styles.CardDescr}>
          Цена: <span className={styles.CardPrice}>{price}₽</span>
        </p>
        <span className={styles.CardDate}>Аккумулятор: {accum}</span>
        <span className={styles.CardTime}> Обьем памяти: {memory} </span>
        <span className={styles.CardRating}> Рейтинг: {rating}</span>
        <div className={styles.CardQuantityWrapper}>
          <span
            className={
              quantity === 0 ? styles.CardQuantityError : styles.CardQuantity
            }
          >
            {quantity === 0 ? 'Нет в наличии' : `Количество: ${quantity}`}{' '}
          </span>

          {addedToCart && (
            <div className={styles.CardCounter}>
              <button
                onClick={() => handleProductQuantityMinus(product, quantity)}
                className={styles.CardCounterBtn}
              >
                -
              </button>
              <span className={styles.CardCounterCount}>{quantity}</span>
              <button
                onClick={() => handleProductQuantityPlus(product, quantity)}
                className={styles.CardCounterBtn}
              >
                +
              </button>
            </div>
          )}
        </div>
        <img className={styles.CardImage} src={photo} alt='photo' />

        <div className={styles.CardButtonWrapper}>
          <button
            className={!like ? styles.CardBtnEdit : styles.CardBtnEditActive}
            onClick={() => handleLikeToggle(id, like)}
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
          </button>

          <button
            className={styles.CardBtnAddtocart}
            onClick={() =>
              addedToCart ? deletetoCart(id) : addToCart(product)
            }
            disabled={quantity === 0}
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
        <NavLink to={`/card/${id}`} className={styles.CardBtnMore}>
          Показать подробнее
        </NavLink>
      </div>
    );
  }
);

export default Card;
