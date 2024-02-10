import { configureStore } from '@reduxjs/toolkit';

import {
	TypedUseSelectorHook,
	useSelector as useReduxSelector,
} from 'react-redux';

import { extendedApiSlice } from './features/posts/postSlice';

// import { extendedUsersSlice } from './features/users/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: extendedApiSlice.reducer,
		// users: extendedUsersSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
// export const useAppDispatch: () => AppDispatch  = useDispatch
