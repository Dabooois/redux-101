import { createSelector } from 'reselect';
import { RootState } from '../../store';

const users = (state: RootState) => state.users;

export const getUsers = createSelector([users], (state) => state.users);
export const getUserStatus = createSelector([users], (state) => state.status);

export const getUserById = createSelector(
	[users, (state: RootState, id: number) => id],
	(state, id) => state.users.find((user) => user.id === id)
);
