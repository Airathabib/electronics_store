import React, { createContext, SetStateAction, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardContextType } from '../interfaces/interface';
export const CardContext = createContext<CardContextType | null>(null);

const CardContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(4);
  const [isInputActive] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  // Функция для обновления параметров поиска
  const handleChangeFilters = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(key) === value || !value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Функция для обработки взаимодействия с формой
  const handleFormInteraction = () => {
    setIsTouched(true);
    setOpenNav(false);
  };

  // Функция сброса категории
  const resetCategory = () => {
    const newParams = new URLSearchParams();

    // Получаем все ключи
    const keys = ['category', 'search', 'sort'];

    // Удаляем все параметры
    keys.forEach((key) => newParams.delete(key));
    setSearchParams(newParams);
    setOpenNav(false);
  };

  // Управление навигацией
  const handleOpenNav = () => setOpenNav(true);
  const handleCloseNav = () => {
    if (!isInputActive) {
      setOpenNav(false);
    }
  };

  // Проверка вводимых значений в инпут
  const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    const key = e.key;
    const keyCode = e.keyCode || e.which;
    const inputValue = input.value;

    // Разрешаем ввод цифр, backspace, delete и стрелки
    if (
      (key >= '0' && key <= '9') ||
      keyCode === 8 || // backspace
      keyCode === 46 || // delete
      (keyCode >= 37 && keyCode <= 40) // стрелки
    ) {
      return true;
    }

    // Дополнительная проверка через регулярное выражение
    const isValid = /^\d*$/.test(inputValue);
    if (!isValid) {
      input.value = inputValue.replace(/[^\d]/g, '');
    }
    e.preventDefault();
  };

  // Форматирование даты
  const formatDate = (dateString?: string | number | Date): string => {
    if (dateString === undefined || dateString === null) {
      return '—';
    }

    let date;

    // Попытка 1: Обработка стандартных форматов (ISO, таймстамп)
    try {
      date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString('ru-RU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    } catch (error) {
      // Продолжаем попытки
    }

    // Попытка 2: Обработка формата "DD.MM.YYYY, HH:mm:ss"
    if (typeof dateString === 'string') {
      const [datePart, timePart] = dateString.split(', ');
      if (datePart && timePart) {
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        // JavaScript месяцы начинаются с 0, поэтому вычитаем 1
        date = new Date(year, month - 1, day, hours, minutes, seconds);

        if (!isNaN(date.getTime())) {
          return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
      }
    }

    // Если все попытки провалились
    console.error(`Недействительная дата: ${dateString}`);
    return 'Недоступна';
  };

  // Пагинация
  const paginate = (pageNumber: SetStateAction<number>) =>
    setCurrentPage(pageNumber);
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  return (
    <CardContext.Provider
      value={{
        openNav,
        handleOpenNav,
        handleCloseNav,
        category: searchParams.get('category') || '',
        resetCategory,
        currentPage,
        setCurrentPage,
        cardsPerPage,
        lastCardIndex,
        firstCardIndex,
        paginate,
        searchParams,
        handleChangeFilters,
        validateNumberInput,
        formatDate,
        isFormValid,
        setIsFormValid,
        isTouched,
        setIsTouched,
        handleFormInteraction,
        openModal,
        setOpenModal,
        openRegistration,
        setOpenRegistration,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
