import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import usersReducer from './usersSlise';
import { brandsApi } from './brandsAPI';
import { commentsApi } from './commentsApi';
import { productCardApi } from './productCardApi';
import { productsApi } from './productApi';

// store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer,
    [brandsApi.reducerPath]: brandsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [productCardApi.reducerPath]: productCardApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      brandsApi.middleware,
      commentsApi.middleware,
      productCardApi.middleware,
      productsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
