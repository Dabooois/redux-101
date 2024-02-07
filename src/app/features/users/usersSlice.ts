import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

type TUser = {
	id: number;
	name: string;
};
type TUserSliceState = {
	users: TUser[];
	status: string;
	error: undefined | string;
};

const initialState = {
	users: [],
	status: 'idle',
	error: undefined,
} as TUserSliceState;

export const fetchUsers = createAsyncThunk<TUser[]>(
	'posts/fetchUsers',
	async () => {
		try {
			const response = await axios.get(BASE_URL);
			return response.data;
		} catch (error) {
			return error;
		}
	}
);

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},

	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action?.error?.message;
			});
	},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
