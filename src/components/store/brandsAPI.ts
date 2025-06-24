import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../shared/api';

export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getBrands: builder.query<string[], void>({
      query: () => './brands',
    }),
  }),
});

export const { useGetBrandsQuery } = brandsApi;
