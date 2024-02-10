import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { postsData, postsResult } from './postSlice';

// const post = (state: RootState) => state;

export const postsLists = createSelector(postsResult, (state) => state.data);

export const postById = createSelector(
	[postsResult, (state: RootState, id: number) => id],
	(state, id) => state.data?.entities[id]
);

export const postByUser = createSelector(
	[postsResult, (state: RootState, userId: number) => userId],
	(state, userId) => Number(state.data?.entities.userId) === userId
);
