import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import { CardContextType, Product } from '../../interfaces/interface';
import { useGetProductsQuery } from '../../store/productApi';

const useProductList = (): {
  error: string | null;
  isLoading: boolean;
  products: Product[];
} => {
  const { searchParams } = useContext(CardContext) as CardContextType;

  // Используем правильный хук из RTK Query
  const {
    isLoading,
    isError,
    error,
    data: products = [],
  } = useGetProductsQuery(searchParams.toString(), {
    skip: !searchParams,
    refetchOnMountOrArgChange: true, // Автоматически обновляем при изменении params
  });

  // Если нужно обрабатывать ошибки более детально
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isError && error) {
      // Handle different error types from RTK Query
      if ('message' in error && error.message) {
        setErrorMessage(error.message);
      } else if ('error' in error && error.error) {
        setErrorMessage(error.error);
      } else if ('data' in error && error.data) {
        setErrorMessage(String(error.data));
      } else {
        setErrorMessage(
          'Не удалось загрузить информацию, попробуйте обновить страницу'
        );
      }
    } else {
      setErrorMessage(null);
    }
  }, [isError, error]);

  return {
    error: errorMessage,
    isLoading,
    products: products || [],
  };
};

export default useProductList;
