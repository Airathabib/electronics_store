import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../shared/api';
import { Product } from '../interfaces/interface';

export const productsApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (params) => `/products/?${params}`,
      providesTags: [{ type: 'Product', id: 'Card' }],
    }),
    toggleLike: builder.mutation<Product, { id: string; like: boolean }>({
      query: ({ id, like }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: { like },
      }),
      invalidatesTags: [{ type: 'Product', id: 'Card' }],
    }),
		createProduct: builder.mutation<Product, Product>({
			query: (product) => ({
				url: '/products',
				method: 'POST',
				body: product,
			}),
			invalidatesTags: [{ type: 'Product', id: 'Card' }],
		}),
  }),
});

// Экспортируем хуки
export const { useGetProductsQuery, useToggleLikeMutation, useCreateProductMutation } = productsApi;
