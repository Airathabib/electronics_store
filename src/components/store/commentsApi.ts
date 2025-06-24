import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../shared/api';
import { Comments } from '../interfaces/interface';

export const commentsApi = createApi({
	reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
	tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<Comments[], string>({
      query: (id) => `comments?productId=${id}`,
			providesTags:[{type: 'Comment', id: 'COMMENT'}]
    }),
		
    addComments: builder.mutation<void, Comments>({
      query: (comment) => ({
        url: 'comments',
        method: 'POST',
        body: comment,
      }),
			invalidatesTags:[{type: 'Comment', id: 'COMMENT'}],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentsMutation } = commentsApi;
