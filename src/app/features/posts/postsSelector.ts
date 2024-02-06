import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { TPost } from './postSlice';

export const postsLists = createSelector(
	[(state: RootState) => state.posts],
	(state) => state.posts
);

export const postById = createSelector(
    [
        (state: RootState) => state.posts,
        (state: RootState, id: string) => id
    ],
	(state, id) => state.posts.filter((value) => value.id === id)
);
    