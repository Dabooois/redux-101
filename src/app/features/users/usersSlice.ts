import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		id: '0',
		name: 'daboi',
	},
	{
		id: '1',
		name: 'edcel',
	},
];

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
