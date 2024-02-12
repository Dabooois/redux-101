import {
	EntityState,
	createEntityAdapter,
	createSelector,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';
import { RootState } from '../../store';

// const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS = 'Users' as const;
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

			providesTags: (result) => {
				if (!result) return [{ type: USERS, id: 'LIST' }];

				const tags =
					result.ids.length > 0
						? // Typescript accepts type of next line if I return it
						  result.ids.map((id) => ({
								type: USERS,
								id,
						  }))
						: // Typescript also accepts type of next line if I return it
						  [{ type: USERS, id: 'LIST' }];
				return tags;
			},
		}),

		getUser: build.query<TUser, string>({
			query: (id) => `users/${id}`,
			providesTags: (result, error, arg) => {
				return [{ type: USERS, id: arg }];
			},
		}),
	}),
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
