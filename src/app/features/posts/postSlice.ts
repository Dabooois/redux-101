import { RootState } from './../../store';
import {
	createEntityAdapter,
	createSelector,
	EntityState,
} from '@reduxjs/toolkit';

import { apiSlice } from '../../api/apiSlice';
import { url } from 'inspector';
import { INITIAL_STATE } from './PostForm';

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

export const extendedPostApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query<EntityState<TPost, string>, void>({
			query: () => 'posts',
			transformResponse: (posts: TPost[]) => {
				const result = posts.map((post) => {
					return {
						...post,
						reactions: post.reactions || {
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
		getPost: builder.query<TPost, { id: string }>({
			query: ({ id }) => ({
				url: `posts/${id}`,
			}),
			transformResponse: (result: TPost) => {
				const reactions =
					Object.keys(initialState.entities).length > 0
						? initialState?.entities[result.id].reactions ||
						  INITIAL_STATE.reactions
						: INITIAL_STATE.reactions;
				return {
					...result,
					reactions,
				};
			},
			providesTags: (result, error, arg) => {
				return [{ type: POSTS, id: arg.id }];
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

			invalidatesTags: (result, error, arg) => [
				{ type: POSTS, id: arg.id },
			],
		}),
		deletePost: builder.mutation<
			EntityState<TPost, string>,
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `posts/${id}`,
				method: 'DELETE',
			}),
			transformResponse: (postId: string) =>
				postsAdapter.removeOne(initialState, postId),

			invalidatesTags: (result, error, { id }) => [
				{ type: POSTS, id },
				{ type: POSTS, id: 'LIST' },
			],
		}),
		postByUser: builder.query<TPost[], { userId: string }>({
			query: ({ userId }) => ({
				url: `posts?userId=${userId}`,
			}),
			transformResponse: (posts: TPost[]) => {
				const reactions = posts.map((post) => {
					return {
						...post,
						reactions:
							Object.keys(initialState.entities).length > 0
								? initialState?.entities[post.id].reactions || {
										thumbsUp: 0,
										heart: 0,
										wow: 0,
										rocket: 0,
										coffee: 0,
								  }
								: {
										thumbsUp: 0,
										heart: 0,
										wow: 0,
										rocket: 0,
										coffee: 0,
								  },
					};
				});
				return reactions;
			},
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostQuery,
	usePostByUserQuery,
	useAddPostMutation,
	useDeletePostMutation,
	useEditPostMutation,
} = extendedPostApiSlice;

export const postsResult = extendedPostApiSlice.endpoints.getPosts.select();
export const postsData = createSelector(postsResult, (state) => state.data);

// destructure adapter
export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
	postsAdapter.getSelectors(
		(state: RootState) => postsData(state) ?? initialState
	);
