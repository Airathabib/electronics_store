import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../shared/api';
import { Product } from '../interfaces/interface';

export const productCardApi = createApi({
  reducerPath: 'productCardApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['ProductCard'],
  endpoints: (builder) => ({
    getProductCard: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: [{ type: 'ProductCard', id: 'Card' }],
    }),
    toggleLike: builder.mutation<Product, { id: string; like: boolean }>({
      query: ({ id, like }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: { like },
      }),
      invalidatesTags: [{ type: 'ProductCard', id: 'Card' }],
    }),
  }),
});

// Экспортируем хуки
export const { useGetProductCardQuery, useToggleLikeMutation } = productCardApi;
