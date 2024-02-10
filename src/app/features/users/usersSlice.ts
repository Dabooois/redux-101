import {
	EntityState,
	createEntityAdapter,
	createSelector,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

// const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export type TUser = {
	id: number;
	name: string;
};

export const usersAdapter = createEntityAdapter({
	selectId: (users) => users.id,
	sortComparer: (a: TUser, b: TUser) => b.name.localeCompare(a.name),
});

const initialState = usersAdapter.getInitialState();

export const extendedUsersSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<EntityState<TUser, number>, void>({
			query: () => 'users',
			transformResponse: (result: TUser[]) =>
				usersAdapter.setAll(initialState, result),
		}),
	}),
});

export const { useGetUsersQuery } = extendedUsersSlice;

export const usersResult = extendedUsersSlice.endpoints.getUsers.select();
export const usersData = createSelector(usersResult, (state) => state.data);
// type TUserSliceState = {
// 	users: TUser[];
// 	status: string;
// 	error: undefined | string;
// };

// const initialState = {
// 	users: [],
// 	status: 'idle',
// 	error: undefined,
// } as TUserSliceState;

// export const fetchUsers = createAsyncThunk<TUser[]>(
// 	'posts/fetchUsers',
// 	async () => {
// 		try {
// 			const response = await axios.get(BASE_URL);
// 			return response.data;
// 		} catch (error) {
// 			return error;
// 		}
// 	}
// );

// const userSlice = createSlice({
// 	name: 'users',
// 	initialState,
// 	reducers: {},

// 	extraReducers(builder) {
// 		builder
// 			.addCase(fetchUsers.pending, (state, action) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchUsers.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.users = action.payload;
// 			})
// 			.addCase(fetchUsers.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.error = action?.error?.message;
// 			});
// 	},
// });

// export const {} = userSlice.actions;

// export default userSlice.reducer;
