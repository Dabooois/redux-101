import {
	EntityState,
	createEntityAdapter,
	createSelector,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';
import { RootState } from '../../store';

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

		getUser: build.query<EntityState<TUser, number>, string>({
			query: (id) => `users/${id}`,
		}),
	}),
	overrideExisting: false,
});

export const { useGetUsersQuery, useGetUserQuery } = extendedUsersSlice;

export const usersResult = extendedUsersSlice.endpoints.getUsers.select();
export const usersData = createSelector(usersResult, (state) => state.data);

// destructure adapter
export const {
	selectAll: getUsers,
	selectById: getUserById,
	selectEntities: getUserEntites,
	selectIds: getUserIds,
	selectTotal: getUserTotal,
} = usersAdapter.getSelectors(
	(state: RootState) => usersData(state) ?? initialState
);
