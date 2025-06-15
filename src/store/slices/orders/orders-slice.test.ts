import { expect, describe, it } from '@jest/globals';
import reducer, {
	initialState,
	connect,
	disconnect,
	sendMessage,
	onConnected,
	onDisconnected,
	onMessageReceived,
	onError,
	addOrder,
	removeOrder,
} from './orders-slice';
import { testOrders } from '@utils/test-utils';

import type { OrderMessageType } from '../../../types/order.types';
import type { TOrderState } from './orders-slice';

describe('ordersSlice', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(reducer(undefined, { type: '' })).toEqual(initialState);
		});
	});

	describe('connect', () => {
		it('should set status to connecting and clear data', () => {
			const stateWithData: TOrderState = {
				...initialState,
				data: {
					success: true,
					orders: [],
					total: 0,
					totalToday: 0,
				},
				status: 'disconnected',
			};
			const action = connect('ws://test-url');
			const state = reducer(stateWithData, action);

			expect(state.status).toBe('connecting');
			expect(state.data).toBeNull();
		});
	});

	describe('disconnect', () => {
		it('should set status to disconnecting and clear data', () => {
			const stateWithData: TOrderState = {
				...initialState,
				data: { success: true, orders: [], total: 0, totalToday: 0 },
				status: 'connected',
			};
			const action = disconnect();
			const state = reducer(stateWithData, action);

			expect(state.status).toBe('disconnecting');
			expect(state.data).toBeNull();
		});
	});

	describe('sendMessage', () => {
		it('should not modify state', () => {
			const testState = { ...initialState };
			const action = sendMessage({
				orders: [],
				total: 0,
				totalToday: 0,
				success: true,
			});
			const state = reducer(testState, action);

			expect(state).toEqual(testState);
		});
	});

	describe('onConnected', () => {
		it('should set status to connected and clear data', () => {
			const stateWithData: TOrderState = {
				...initialState,
				data: { orders: [], total: 0, totalToday: 0, success: true },
				status: 'connecting',
			};
			const action = onConnected(new Event('connected'));
			const state = reducer(stateWithData, action);

			expect(state.status).toBe('connected');
			expect(state.data).toBeNull();
		});
	});

	describe('onDisconnected', () => {
		it('should set status to disconnected and clear data', () => {
			const stateWithData: TOrderState = {
				...initialState,
				data: { orders: [], total: 0, totalToday: 0, success: true },
				status: 'connected',
			};
			const action = onDisconnected(new CloseEvent('disconnected'));
			const state = reducer(stateWithData, action);

			expect(state.status).toBe('disconnected');
			expect(state.data).toBeNull();
		});
	});

	describe('onMessageReceived', () => {
		it('should update data with payload', () => {
			const testData: OrderMessageType = {
				orders: [testOrders],
				success: true,
				total: 1,
				totalToday: 1,
			};
			const action = onMessageReceived(testData);
			const state = reducer(initialState, action);

			expect(state.data).toEqual(testData);
		});
	});

	describe('onError', () => {
		it('should set status to error and update error', () => {
			const testError = new Event('test error');
			const action = onError(testError);
			const state = reducer(initialState, action);

			expect(state.status).toBe('error');
			expect(state.error).toBe(testError);
		});
	});

	describe('addOrder', () => {
		it('should set currentOrder', () => {
			const testOrder = testOrders;
			const action = addOrder(testOrder);
			const state = reducer(initialState, action);

			expect(state.currentOrder).toEqual(testOrder);
		});
	});

	describe('removeOrder', () => {
		it('should clear currentOrder', () => {
			const stateWithOrder: TOrderState = {
				...initialState,
				currentOrder: testOrders,
			};
			const action = removeOrder();
			const state = reducer(stateWithOrder, action);

			expect(state.currentOrder).toBeNull();
		});
	});
});
