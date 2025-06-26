export interface CardContextType {
  openNav: boolean;
  handleOpenNav: () => void;
  handleCloseNav: () => void;
  category: string;
  resetCategory: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  cardsPerPage: number;
  lastCardIndex: number;
  firstCardIndex: number;
  paginate: (pageNumber: React.SetStateAction<number>) => void;
  searchParams: URLSearchParams;
  handleChangeFilters: (key: string, value: string | null) => void;
  formatDate: (dateString: string | number | Date) => string;
  isFormValid: boolean;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  isTouched: boolean;
  setIsTouched: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormInteraction: () => void;
  validateNumberInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openRegistration: boolean;
  setOpenRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Product = {
  brand: string;
  category: string;
  quantity: number;
  id: string;
  title: string;
  description: string;
  price: number;
  like: boolean;
  addedToCart: boolean;
  accum: string;
  memory: string;
  photo?: string;
  rating: number;
  handleDelete?: (id: number) => void;
  handleSubmit?: () => void;
};

export type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export type Cart = {
  id: string;
  brand: string;
  category: string;
  quantity: number;
  title: string;
  description: string;
  price: number;
  like: boolean;
  addedToCart: boolean;
  accum: string;
  memory: string;
  rating: number;
  photo?: string;
};
export type Comments = {
  userName: string;
  userComment: string;
  date: string;
  productId: string;
  id?: number;
};

export interface UserType {
  id?: number;
  login: string;
  password: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: UserType | null;
  loading: boolean;
  error: string | null;
}

export interface ErrorType {
  message: string;
}
