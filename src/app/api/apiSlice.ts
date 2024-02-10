import { TPost } from './../features/posts/postSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_PATH = 'http://127.0.0.1:8080/';
type T2Post = Omit<TPost, 'reactions'>;
export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: API_PATH }),
	reducerPath: 'api',
	tagTypes: ['Posts'],
	endpoints: (builder) => ({
		getPosts: builder.query<T2Post[], void>({
			query: () => 'posts',
			providesTags: ['Posts'],
			transformResponse: (res: T2Post[]) =>
				res.sort((a, b) => Number(b.id) - Number(a.id)),
		}),
		addPost: builder.mutation<T2Post, T2Post>({
			query: (post) => ({
				url: 'posts',
				method: 'POST',
				body: post,
			}),
		}),
		updatePost: builder.mutation<T2Post, T2Post>({
			query: (post) => ({
				url: `posts/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Posts'],
		}),
		deletePost: builder.mutation<void, { postId: string }>({
			query: ({ postId }) => ({
				url: `posts/${postId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Posts'],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useUpdatePostMutation,
	useAddPostMutation,
	useDeletePostMutation,
} = apiSlice;
