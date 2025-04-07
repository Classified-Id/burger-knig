import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { TOrder, TOrderSliceInitState } from '../../types/order.types';

const initialState: TOrderSliceInitState = {
	order: {
		name: '',
		order: { number: 1 },
		success: false,
	},
	showOrderModal: false,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderData(state, action: PayloadAction<TOrder>) {
			state.order = action.payload;
		},
		setShowOrderModal(state, action: PayloadAction<boolean>) {
			state.showOrderModal = action.payload;
		},
	},
});

export const { setOrderData, setShowOrderModal } = orderSlice.actions;
