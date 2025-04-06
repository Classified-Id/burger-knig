import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type TOrderSliceInitState = {
	order: number;
};

const initialState: TOrderSliceInitState = {
	order: 1,
};

/** пока не уверен в этом слайсе, пусть будет */

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderData(state, action: PayloadAction<number>) {
			return {
				...state,
				ingredients: action.payload,
			};
		},
	},
});

export const { setOrderData } = orderSlice.actions;
