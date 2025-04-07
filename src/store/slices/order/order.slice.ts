import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type TOrderSliceInitState = {
	order: number;
	showOrderModal: boolean;
};

const initialState: TOrderSliceInitState = {
	order: 1,
	showOrderModal: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderData(state, action: PayloadAction<number>) {
			state.order = action.payload;
		},
		setShowOrderModal(state, action: PayloadAction<boolean>) {
			state.showOrderModal = action.payload;
		},
	},
});

export const { setOrderData, setShowOrderModal } = orderSlice.actions;
