import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const postsLists = createSelector(
	[(state: RootState) => state.posts],
	(state) => state.posts
);

export const postsState = createSelector(
	[(state: RootState) => state.posts],
	(state) => state.status
);

export const postsError = createSelector(
	[(state: RootState) => state.posts],
	(state) => state.error
);

export const postById = createSelector(
	[(state: RootState) => state.posts, (state: RootState, id: string) => id],
	(state, id) => state.posts.filter((value) => value.id === id)
);
