import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CART_URL } from '../shared/api';
import { Cart } from '../interfaces/interface';
import { RootState, AppDispatch } from '../store/index';

interface CartState {
  cart: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk<
  Cart[],
  {
    inputValue: string;
    category: string;
    sort: string;
    price: { priceFrom: string; priceTo: string };
  },
  { rejectValue: string }
>('cart/fetchCart', async (params, { rejectWithValue }) => {
  const { inputValue, category, sort, price } = params;
  const queryParams = new URLSearchParams();

  if (inputValue) {
    queryParams.append('q', inputValue);
  }

  if (category) {
    queryParams.append('category_like', category);
  }

  if (sort) {
    queryParams.append('_sort', 'price');
    queryParams.append('_order', sort);
  }

  if (price) {
    if (price.priceFrom) {
      queryParams.append('price_gte', price.priceFrom);
    }
    if (price.priceTo) {
      queryParams.append('price_lte', price.priceTo);
    }
  }
  try {
    const response = await fetch(`${CART_URL}?${queryParams}`);

    if (!response.ok) {
      throw new Error(
        'Не удалось загрузить информацию, попробуйте обновить страницу'
      );
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    return rejectWithValue(error as string);
  }
});

export const addCart = createAsyncThunk<
  Cart,
  Cart,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>('cart/addCart', async (product, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const existingProduct = state.cart.cart.find((p) => p.id === product.id);
    if (existingProduct) {
      throw new Error('Товар уже в корзине!');
    }

    const response = await fetch(`${CART_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, addedToCart: true }),
    });

    if (!response.ok) throw new Error('Ошибка добавления в корзину');

    dispatch(
      fetchCart({
        inputValue: '',
        category: '',
        sort: '',
        price: { priceFrom: '', priceTo: '' },
      })
    );

    return await response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const deleteCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string; dispatch: AppDispatch }
>('cart/deleteCart', async (id, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`${CART_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Ошибка удаления из корзины');

    dispatch(removeProductFromCart(id));
    dispatch(
      fetchCart({
        inputValue: '',
        category: '',
        sort: '',
        price: { priceFrom: '', priceTo: '' },
      })
    );

    return id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

export const updateProductCart = createAsyncThunk<
  Cart,
  Cart,
  { rejectValue: string; dispatch: AppDispatch }
>('cart/updateProductCart', async (product, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(`${CART_URL}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error('Ошибка обновления корзины');

    if (response.status === 204) {
      dispatch(removeProductFromCart(product.id));
    }

    dispatch(
      fetchCart({
        inputValue: '',
        category: '',
        sort: '',
        price: { priceFrom: '', priceTo: '' },
      })
    );

    return await response.json();
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

// Слайс
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeProductFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart[]>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        const existingProduct = state.cart.find(
          (p) => p.id === action.payload.id
        );
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          state.cart.push({
            ...action.payload,
            quantity: action.payload.quantity || 1,
          });
        }
      })
      .addCase(deleteCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.cart = state.cart.filter((p) => p.id !== action.payload);
      })
      .addCase(
        updateProductCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          const index = state.cart.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.cart[index] = action.payload;
          }
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
