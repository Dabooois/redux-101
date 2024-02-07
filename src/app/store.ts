import { configureStore } from '@reduxjs/toolkit';

import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';

import counterReducer from './features/counter/counteSlice';
import postsReducer from './features/posts/postSlice';

import usersReducer from './features/users/usersSlice';

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		counter: counterReducer,
		users: usersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export const useAppDispatch: () => AppDispatch  = useDispatch
