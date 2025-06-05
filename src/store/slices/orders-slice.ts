import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postOrder } from '../../api/orders.api';
import { OrderMessageType, OrderType } from '../../types/order.types';

type OrderState = {
	data: OrderMessageType | null;
	orderNumber: number | null;
	error: Event | null;
	status:
		| 'connecting'
		| 'disconnecting'
		| 'connected'
		| 'disconnected'
		| 'error';
	isLoading: boolean;
	isError: boolean;
	currentOrder: OrderType | null;
};

const initialState: OrderState = {
	data: null,
	orderNumber: null,
	error: null,
	isLoading: false,
	isError: false,
	status: 'disconnected',
	currentOrder: null,
};

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		connect: (state, _action: PayloadAction<string>) => {
			state.status = 'connecting';
			state.data = null;
		},
		disconnect: (state) => {
			state.status = 'disconnecting';
			state.data = null;
		},
		sendMessage: (_state, _action: PayloadAction<OrderMessageType>) => {
			console.log('message');
		},
		onConnected: (state, _action: PayloadAction<Event>) => {
			state.status = 'connected';
			state.data = null;
		},
		onDisconnected: (state, _action: PayloadAction<CloseEvent>) => {
			state.status = 'disconnected';
			state.data = null;
		},
		onMessageReceived: (state, action: PayloadAction<OrderMessageType>) => {
			state.data = action.payload;
		},
		onError: (state, action: PayloadAction<Event>) => {
			state.status = 'error';
			state.error = action.payload;
		},
		addOrder: (state, action: PayloadAction<OrderType>) => {
			state.currentOrder = action.payload;
		},
		removeOrder: (state) => {
			state.currentOrder = null;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(postOrder.pending, (state) => {
	// 			state.isLoading = true;
	// 			state.isError = false;
	// 		})
	// 		.addCase(postOrder.fulfilled, (state, action) => {
	// 			state.isLoading = false;
	// 			state.isError = false;
	// 			state.orderNumber = action.payload.order.number;
	// 		})
	// 		.addCase(postOrder.rejected, (state) => {
	// 			state.isLoading = false;
	// 			state.isError = true;
	// 		});
	// },
});

export const {
	connect,
	disconnect,
	sendMessage,
	onConnected,
	onDisconnected,
	onMessageReceived,
	onError,
	addOrder,
	removeOrder,
} = ordersSlice.actions;
