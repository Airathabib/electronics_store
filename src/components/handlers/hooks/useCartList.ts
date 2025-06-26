import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../handlers/reduxHooks/reduxHooks';
import { CardContext } from '../../Context/Context';
import { useContext } from 'react';
import { fetchCart } from '../../store/cartSlice';
import { CardContextType, Product } from '../../interfaces/interface';

const useCartList = (): {
  error: string | null;
  loading: boolean;
  cart: Product[];
} => {
  const { searchParams } = useContext(CardContext) as CardContextType;
  const dispatch = useAppDispatch();

  const { error, loading, cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const parseSearchParams = (
      params: URLSearchParams
    ): {
      inputValue: string;
      category: string;
      sort: string;
      price: { priceFrom: string; priceTo: string };
    } => {
      const inputValue = params.get('q') || '';
      const category = params.get('category') || '';
      const sort = params.get('sort') || '';
      const priceFrom = params.get('priceFrom') || '';
      const priceTo = params.get('priceTo') || '';

      return {
        inputValue,
        category,
        sort,
        price: { priceFrom, priceTo },
      };
    };

    if (searchParams) {
      const cartParams = parseSearchParams(searchParams);

      dispatch(fetchCart(cartParams));
    } else {
      // Если searchParams пустые, загружаем все товары без фильтров
      dispatch(
        fetchCart({
          inputValue: '',
          category: '',
          sort: '',
          price: { priceFrom: '', priceTo: '' },
        })
      );
    }
  }, [dispatch, searchParams]);

  return { error, loading, cart };
};

export default useCartList;
