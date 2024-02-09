import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const post = (state: RootState) => state.posts;

export const postsLists = createSelector([post], (state) => state.entities);

export const postsState = createSelector([post], (state) => state.status);

export const postsError = createSelector([post], (state) => state.error);

export const getCount = createSelector([post], (state) => state.count);

export const postById = createSelector(
	[post, (state: RootState, id: number) => id],
	(state, id) => state.entities[id]
);

export const postByUser = createSelector(
	[post, (state: RootState, userId: number) => userId],
	(state, userId) =>
		Object.values(state.entities).filter(
			(post) => Number(post.userId) === Number(userId)
		)
);
