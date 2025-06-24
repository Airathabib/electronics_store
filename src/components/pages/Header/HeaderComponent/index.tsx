import React from 'react';
import Logo from '../../../../assets/logo/logo.png';
import { useContext } from 'react';
import { CardContext } from '../../../Context/Context';
import useCartList from '../../../handlers/hooks/useCartList';
import styles from './index.module.scss';
import useProductList from '../../../handlers/hooks/useProductList';
import { CardContextType } from '../../../interfaces/interface';
import { Button, Spin } from 'antd';
import ModalWindow from '../../../features/Modal';

const HeaderComponent: React.FC = () => {
  const { cart } = useCartList();

  const { products, isLoading, error } = useProductList();

  const favoriteProducts = products.filter((product) => product.like);

  const { handleOpenNav, searchParams, setOpenModal } = useContext(
    CardContext
  ) as CardContextType;

  const fiilters =
    searchParams.get('category') ||
    searchParams.get('price_gte') ||
    searchParams.get('price_lte');

  return (
    <div className={styles.HeaderContainer}>
      {isLoading && <Spin size='large' />}
      {error && <div className={styles.Error}>{error}</div>}
      <div className={styles.LogoContainer}>
        <img className={styles.Logo} src={Logo} alt='logo' />
        <div className={styles.BtnWrapper}>
          {fiilters && <div className={styles.FilterMarker} />}
          <button className={styles.HeaderBtn} onClick={handleOpenNav}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke=''
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4 6h16' />
              <path d='M7 12h13' />
              <path d='M10 18h10' />
            </svg>
          </button>
        </div>
        <h1 className={styles.MainTitle}>Магазин электроники</h1>
      </div>
      <div className={styles.MainIcons}>
        <div className={styles.FavoriteProducts}>
          {favoriteProducts.length > 0 && (
            <div className={styles.FavoriteProductsMarker}>
              {' '}
              {favoriteProducts.length}{' '}
            </div>
          )}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
          </svg>
        </div>

        <div className={styles.MainCart}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
            <path d='M17 17h-11v-14h-2' />
            <path d='M6 5l14 1l-1 7h-13' />
          </svg>
          {cart.length > 0 && (
            <span className={styles.MainCartCount}> {cart.length}</span>
          )}
        </div>
        <div className={styles.LoginEnter}>
          <Button
            className={styles.LoginEnterBtn}
            onClick={() => setOpenModal(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
              <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
            </svg>
          </Button>
        </div>
      </div>

      <ModalWindow />
    </div>
  );
};

export default HeaderComponent;
