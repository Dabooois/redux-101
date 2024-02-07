import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
	nanoid,
} from '@reduxjs/toolkit';
import { Name } from './Reaction';
import axios from 'axios';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
export type TPost = {
	id: string;
	title: string;
	content: string;
	userId: string;
	reactions: {
		thumbsUp: number;
		heart: number;
		wow: number;
		rocket: number;
		coffee: number;
	};
};

type TPostState = {
	posts: TPost[];
	status: string;
	error: string | undefined;
};

type TAddReaction = {
	id: string;
	reaction: string;
};

const initialState = {
	posts: [],
	status: 'idle',
	error: undefined,
} as TPostState;

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

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: {
			reducer(state, action: PayloadAction<TPost>) {
				state = {
					...state,
					posts: [...state.posts, action.payload],
				};
			},
			prepare({ title, content, userId, reactions }: Omit<TPost, 'id'>) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
						reactions,
					},
				};
			},
		},
		addReaction: (state, action: PayloadAction<TAddReaction>) => {
			const post = state.posts.find((el) => el.id === action.payload.id);

			if (post) {
				const result = state.posts.map((val) => {
					if (post.id === val.id) {
						return {
							...val,
							reactions: {
								...val.reactions,
								[action.payload.reaction as Name]:
									post.reactions[
										action.payload.reaction as Name
									] + 1,
							},
						};
					}
					return val;
				});
				state.posts = result;
			}
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

				state.posts = loadedPosts;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message;
			});
	},
});

export const { addPost, addReaction } = postSlice.actions;

export default postSlice.reducer;
