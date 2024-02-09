import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
	createEntityAdapter,
	EntityId,
	nanoid,
} from '@reduxjs/toolkit';
import { Name } from './Reaction';
import axios from 'axios';
import { RootState } from '../../store';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
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

type TPostState = {
	id: EntityId;
	posts: TPost[];
	status: string;
	error: string | undefined;
	count: number;
};

type TAddReaction = {
	id: number;
	reaction: string;
};

export const postsAdapter = createEntityAdapter({
	selectId: (posts) => posts.id,
	sortComparer: (a: TPost, b: TPost) => b.title.localeCompare(a.title),
});

const initialState = postsAdapter.getInitialState({
	status: 'idle',
	error: undefined || '',
	count: 0,
});

export const fetchPosts = createAsyncThunk<TPost[]>(
	'posts/fetchPosts',
	async () => {
		try {
			const response = await axios.get(BASE_URL);
			return response.data;
		} catch (error) {
			return error;
		}
	}
);

export const newPost = createAsyncThunk<
	TPost, // first param is return value for added post
	Pick<TPost, 'title' | 'body' | 'userId'> // send type of param(post)
>('posts/addPost', async (post) => {
	try {
		const response = await axios.post(BASE_URL, post);
		return response.data;
	} catch (error) {
		return error;
	}
});

export const editPost = createAsyncThunk<
	TPost, // first param is return value for added post
	Pick<TPost, 'title' | 'body' | 'userId'> & { id: string } // send type of param(post)
>('posts/editPost', async (post) => {
	const { id } = post;
	try {
		const response = await axios.put(`${BASE_URL}/${id}`, {
			...post,
		});
		return response.data;
	} catch (error) {
		return error;
	}
});

type TDelete = { initialState: string; status: number; error: string };

export const deletePost = createAsyncThunk<TDelete, string>(
	'posts/deletePost',
	async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/${id}`);

			return {
				initialState: id,
				status: 200,
				error: response?.statusText,
			};
		} catch (error) {
			return {
				initialState: id,
				status: 400,
				error: error,
			} as TDelete;
		}
	}
);

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: {
			reducer(state, action: PayloadAction<TPost>) {
				postsAdapter.addOne(state, action.payload);
			},
			prepare({ title, body, userId, reactions }: Omit<TPost, 'id'>) {
				return {
					payload: {
						id: nanoid(),
						title,
						body,
						userId,
						reactions,
					},
				};
			},
		},
		addReaction: (state, action: PayloadAction<TAddReaction>) => {
			const { id, reaction } = action.payload;
			const post = state.entities[id];
			if (post) {
				post.reactions[reaction as Name]++;
				// const result = Object.values(state.entities).map((val) => {
				// 	if (post.id === val.id) {
				// 		return {
				// 			...val,
				// 			reactions: {
				// 				...val.reactions,
				// 				[action.payload.reaction as Name]:
				// 					post.reactions[
				// 						action.payload.reaction as Name
				// 					] + 1,
				// 			},
				// 		};
				// 	}
				// 	return val;
				// });
			}
		},
		increment: (state) => {
			state.count += 1;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const loadedPosts = action.payload.map((el) => {
					el.reactions = {
						thumbsUp: 0,
						heart: 0,
						wow: 0,
						rocket: 0,
						coffee: 0,
					};
					return el;
				});

				postsAdapter.setAll(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message || '';
			})
			.addCase(newPost.fulfilled, (state, action) => {
				state.status = 'succeeded';
				action.payload.userId = Number(action.payload.userId);
				action.payload.reactions = {
					thumbsUp: 0,
					heart: 0,
					wow: 0,
					rocket: 0,
					coffee: 0,
				};
				postsAdapter.addOne(state, action.payload);
			})
			.addCase(editPost.fulfilled, (state, action) => {
				state.status = 'succeeded';

				try {
					if (!action?.payload?.id) {
						console.log('update error');
						console.log(action.payload);
						return;
					}
					const payload = action.payload;

					postsAdapter.upsertOne(state, payload);
				} catch (error) {
					console.log(error);
					throw new Error(`error: ${error}`);
				}
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				Object.values(state.entities)
					.filter((post) => {
						return (
							Number(post) === Number(action.payload.initialState)
						);
					})
					.map((el) => el.id);

				postsAdapter.removeOne(state, action.payload.initialState);
			});
	},
});

// addPost, addReaction,
export const { addReaction, increment } = postSlice.actions;

// destructure adapter
export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
	postsAdapter.getSelectors((state: RootState) => state.posts);

export default postSlice.reducer;
