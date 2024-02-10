import { RootState } from './../../store';
import {
	createEntityAdapter,
	createSelector,
	EntityState,
} from '@reduxjs/toolkit';

import { apiSlice } from '../../api/apiSlice';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const POSTS = 'Posts' as const;
export type TPost = {
	id: string;
	title: string;
	body: string;
	userId: number;
	reactions: {
		thumbsUp: number;
		heart: number;
		wow: number;
		rocket: number;
		coffee: number;
	};
};

// type TPostState = {
// 	id: EntityId;
// 	posts: TPost[];
// 	status: string;
// 	error: string | undefined;
// 	count: number;
// };

// type TAddReaction = {
// 	id: number;
// 	reaction: string;
// };

export const postsAdapter = createEntityAdapter({
	selectId: (posts) => posts.id,
	sortComparer: (a: TPost, b: TPost) => b.title.localeCompare(a.title),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query<EntityState<TPost, string>, void>({
			query: () => 'posts',
			transformResponse: (posts: TPost[]) => {
				const result = posts.map((post) => {
					return {
						...post,
						reactions: {
							thumbsUp: 0,
							heart: 0,
							wow: 0,
							rocket: 0,
							coffee: 0,
						},
					};
				});
				return postsAdapter.setAll(initialState, result);
			},
			providesTags: (result) => {
				// What to do if result is undefined?
				if (!result) return [{ type: POSTS, id: 'LIST' }];

				const tags =
					result.ids.length > 0
						? // Typescript accepts type of next line if I return it
						  result.ids.map((id) => ({
								type: POSTS,
								id,
						  }))
						: // Typescript also accepts type of next line if I return it
						  [{ type: POSTS, id: 'LIST' }];
				return tags;
			},
		}),
		addPost: builder.mutation<EntityState<TPost, string>, TPost>({
			query: (post) => ({
				url: 'posts',
				method: 'POST',
				body: post,
			}),
			transformResponse: (post: TPost) =>
				postsAdapter.addOne(initialState, post),
			invalidatesTags: () => [{ type: POSTS, id: 'LIST' }],
		}),
		editPost: builder.mutation<EntityState<TPost, string>, TPost>({
			query: ({ id, ...rest }) => ({
				url: `posts/${id}`,
				method: 'PUT',
				body: rest,
			}),
			transformResponse: (post: TPost) =>
				postsAdapter.upsertOne(initialState, post),

			invalidatesTags: (result) =>
				result
					? result.ids.map((id) => ({
							type: POSTS,
							id,
					  }))
					: [{ type: POSTS, id: 'LIST' }],
		}),
		delete: builder.mutation<EntityState<TPost, string>, { id: string }>({
			query: ({ id }) => ({
				url: `posts/${id}`,
				method: 'DELETE',
			}),
			transformResponse: (postId: string) =>
				postsAdapter.removeOne(initialState, postId),

			invalidatesTags: (result) =>
				result
					? result.ids.map((id) => ({
							type: POSTS,
							id,
					  }))
					: [{ type: POSTS, id: 'LIST' }],
		}),
	}),
});

export const { useGetPostsQuery } = extendedApiSlice;

export const postsResult = extendedApiSlice.endpoints.getPosts.select();
export const postsData = createSelector(postsResult, (state) => state.data);

// destructure adapter
export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
	postsAdapter.getSelectors(
		(state: RootState) => postsData(state) ?? initialState
	);
