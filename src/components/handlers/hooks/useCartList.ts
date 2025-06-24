import { useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../handlers/reduxHooks/reduxHooks';
import { CardContext } from '../../Context/Context';
import { useContext } from 'react';
import { fetchCart } from '../../store/cartSlice';
import { CardContextType, Product } from '../../interfaces/interface';

const useCartList = ():{ error: string | null; loading: boolean; cart: Product[]} => {

  const { searchParams } = useContext(CardContext) as CardContextType;
  const dispatch = useAppDispatch();
  const { error, loading, cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (searchParams) {
      const cartParams = {
        inputValue: searchParams.toString(),
        category: '',
        sort: '',
        price: { priceFrom: '', priceTo: '' },
      };
      dispatch(fetchCart(cartParams));
    }
  }, [dispatch, searchParams]);

  return { error, loading, cart };
};

export default useCartList;
