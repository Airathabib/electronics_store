import React, { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import InputSearch from '../../features/InputSearch/InputSearch';
import { NavLink } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import { Drawer, Flex, Input, Form, Select } from 'antd';
import { debounce } from 'lodash';
import { CardContextType } from '../../interfaces/interface';
import { useGetBrandsQuery } from '../../store/brandsAPI';

import styles from './index.module.scss';

const Header: React.FC = () => {
  const { data, error, isLoading } = useGetBrandsQuery();
  const {
    handleChangeFilters,
    openNav,
    category,
    resetCategory,
    handleCloseNav,
    validateNumberInput,
    searchParams,
  } = useContext(CardContext) as CardContextType;

  const setActiveClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? styles.FavoriteLinkActive : styles.FavoriteLink;

  const debouncedHandlerPrice = debounce(
    (key: string, value: string | null) => handleChangeFilters(key, value),
    700
  ) as (key: string, value: string | null) => void;

  const options = data?.map((brand) => ({ label: brand, value: brand })) || [];

  return (
    <header className={styles.Header}>
      <HeaderComponent />

      <div className={styles.HeaderContainer}>
        <Drawer placement='left' open={openNav} onClose={handleCloseNav}>
          <Form>
            <ul className={styles.HeaderNavbar}>
              <li
                onClick={() => handleChangeFilters('category', 'phone')}
                className={category === 'phone' ? styles.active : ''}
              >
                Смартфоны
              </li>
              <li
                onClick={() => handleChangeFilters('category', 'smartwatch')}
                className={category === 'smartwatch' ? styles.active : ''}
              >
                Смартчасы
              </li>
              <li
                onClick={() => handleChangeFilters('category', 'airpod')}
                className={category === 'airpod' ? styles.active : ''}
              >
                Наушники
              </li>
            </ul>

            <div className={styles.HeaderFilter}>
              <h3 className={styles.HeaderFilterTitle}>Бренд</h3>
              <Form.Item name='brand' layout='vertical'>
                {error && (
                  <div className={styles.error}>Ошибка загрузки брендов</div>
                )}
                <Select
                  onSelect={(value) => handleChangeFilters('q', value)}
                  loading={isLoading}
                  placeholder='Выберите бренд'
                  options={options}
                ></Select>
              </Form.Item>
            </div>

            <div className={styles.HeaderFilter}>
              <h3 className={styles.HeaderFilterTitle}>Цена</h3>
              <Flex gap='middle'>
                <Form.Item>
                  <Input
                    type='text'
                    allowClear
                    defaultValue={searchParams.get('price_gte') || ''}
                    onChange={(e) =>
                      debouncedHandlerPrice('price_gte', e.target.value)
                    }
                    onKeyDown={validateNumberInput}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(/[^\d]/g, '');
                    }}
                  />
                  <Input
                    type='text'
                    allowClear
                    defaultValue={searchParams.get('price_lte') || ''}
                    onChange={(e) =>
                      debouncedHandlerPrice('price_lte', e.target.value)
                    }
                    onKeyDown={validateNumberInput}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(/[^\d]/g, '');
                    }}
                  />
                </Form.Item>
              </Flex>
            </div>
          </Form>
        </Drawer>

        <div className={styles.HeaderLinks}>
          <NavLink className={setActiveClass} onClick={resetCategory} to='/'>
            {' '}
            Главная
          </NavLink>
          <NavLink
            className={setActiveClass}
            onClick={resetCategory}
            to='/favorites'
          >
            {' '}
            Избранное
          </NavLink>
          <NavLink
            className={setActiveClass}
            onClick={resetCategory}
            to='/cart'
          >
            {' '}
            Корзина
          </NavLink>
        </div>

        <div className={styles.HeaderSearch}>
          <InputSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
