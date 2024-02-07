import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const getUsers = createSelector(
	[(state: RootState) => state.users],
	(state) => state.users
);
export const getUserStatus = createSelector(
	[(state: RootState) => state.users],
	(state) => state.status
);
