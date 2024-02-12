import { usersResult } from './usersSlice';
import { createSelector } from '@reduxjs/toolkit';

export const getUsers = createSelector(usersResult, (state) => state.data);

export const getUserById = createSelector(
	[usersResult, (id: number) => id],
	(state, id) => state.data?.entities[id]
);
