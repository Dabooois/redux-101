import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	count: 0,
};

type TIncrementBy = {
	count: number;
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState: initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		reset: (state) => {
			state.count = 0;
		},
		incrementBy: (state, action: PayloadAction<TIncrementBy>) => {
			state.count += action.payload.count;
		},
	},
});

export const { increment, decrement, reset, incrementBy } =
	counterSlice.actions;

export default counterSlice.reducer;
