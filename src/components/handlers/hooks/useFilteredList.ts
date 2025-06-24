import { useContext } from 'react';
import { CardContext } from '../../Context/Context';
import { CardContextType, Product } from '../../interfaces/interface';

const useFilteredList = (products: Product[]) => {
  const { searchParams } = useContext(CardContext) as CardContextType;

  // Получаем параметры из searchParams
  const inputValue = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const priceFrom = searchParams.get('price_gte') || '';
  const priceTo = searchParams.get('price_lte') || '';

  // Проверяем обязательные параметры
  if (!products) {
    return { data: [], length: 0 };
  }

  // Базовая фильтрация
  const fieldsToSearch = [
    'brand',
    'description',
    'category',
    'title',
    'memory',
  ] as const;
  const filteredArr = products.filter((product) => {
    const isMatch = fieldsToSearch.some((field) => {
      return product[field]
        ?.toString()
        .toLowerCase()
        .includes(inputValue.toLowerCase());
    });

    const isPriceMatch =
      (!priceFrom && !priceTo) ||
      (priceFrom &&
        priceTo &&
        Number(product.price) >= Number(priceFrom) &&
        Number(product.price) <= Number(priceTo)) ||
      (priceFrom && !priceTo && Number(product.price) >= Number(priceFrom)) ||
      (!priceFrom && priceTo && Number(product.price) <= Number(priceTo));

    return (
      isMatch &&
      (category ? product.category.includes(category) : true) &&
      isPriceMatch
    );
  });

  // Улучшенная логика сортировки
  const sortByPrice = (a: { price: number }, b: { price: number }) => {
    const priceA = Number(a.price);
    const priceB = Number(b.price);

    if (sort === 'asc') {
      return priceA - priceB;
    }
    if (sort === 'desc') {
      return priceB - priceA;
    }
    return 0; // если сортировка не указана
  };

  // Применяем сортировку
  filteredArr.sort(sortByPrice);

  return { data: filteredArr };
};

export default useFilteredList;
