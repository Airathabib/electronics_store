import { useMemo } from 'react';
import Card from '../../pages/Card/';
import { ProductState } from '../../interfaces/interface';

const CardListRenderer: React.FC<ProductState> = ({
  products,
}: ProductState) => {
  const renderCards = useMemo(() => {
    if (!Array.isArray(products)) return null;
    return products.map((product) => <Card key={product.id} {...product} />);
  }, [products]);

  return renderCards;
};

export default CardListRenderer;
