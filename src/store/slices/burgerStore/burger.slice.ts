import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type burgerState = {
	burgerData: number;
};

const initialState: burgerState = {
	burgerData: 33,
};

export const burgerSlice = createSlice({
	name: 'burgerData',
	initialState,
	reducers: {
		setBurgerData(state, action: PayloadAction<number>) {
			state.burgerData = action.payload;
		},
	},
});

export const { setBurgerData } = burgerSlice.actions;
