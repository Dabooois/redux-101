import { createSelector } from 'reselect';
import { RootState } from '../../store';

const post = (state: RootState) => state.posts;

export const postsLists = createSelector([post], (state) => state.posts);

export const postsState = createSelector([post], (state) => state.status);

export const postsError = createSelector([post], (state) => state.error);

export const postById = createSelector(
	[post, (state: RootState, id: number) => id],
	(state, id) => state.posts.find((value) => Number(value.id) === id)
);
