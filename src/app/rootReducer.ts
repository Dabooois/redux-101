import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counteSlice'
import postReducer from './features/posts/postSlice'


export const rootReducer = combineReducers({
    posts: postReducer,
    counter: counterReducer
})