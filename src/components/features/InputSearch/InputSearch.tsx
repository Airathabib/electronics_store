import { useContext } from 'react';
import { Input } from 'antd';
import { CardContext } from '../../Context/Context';
import { debounce } from 'lodash';
import { CardContextType } from '../../interfaces/interface';

const InputSearch: React.FC = () => {
  const { handleChangeFilters, searchParams } = useContext(
    CardContext
  ) as CardContextType;
  const debouncedSearch = debounce(
    (e) => handleChangeFilters('q', e.target.value),
    100
  );
  return (
    <Input.Search
      placeholder='Поиск'
      allowClear
      onChange={debouncedSearch}
      value={searchParams.get('q') || ''}
    />
  );
};

export default InputSearch;
