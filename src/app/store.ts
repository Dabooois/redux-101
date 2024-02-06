
import {  configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux'

import counterReducer from './features/counter/counteSlice'
import postsReducer from './features/posts/postSlice'



export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
// export const useAppDispatch: () => AppDispatch  = useDispatch