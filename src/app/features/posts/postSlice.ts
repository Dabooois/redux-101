import { createSlice } from '@reduxjs/toolkit';


export type TPost = {
    id: string
    title: string
    content: string
}
export type TPostState = {
    posts: TPost[]
}

const initialState = {
    posts: [
        {
            id: '1',
            title: 'Learning redux toolkit',
            content: "I've heard this is good",
        },
        {
            id: '2',
            title: 'Learning redux toolkit with typescript',
            content: "I've heard this is good also",
        },
    ]
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        posts: (state) => state
    }
})

export const { posts } = postSlice.actions

export default postSlice.reducer