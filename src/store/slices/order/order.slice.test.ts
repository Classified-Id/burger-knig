import { expect, describe, it } from '@jest/globals';
import reducer, {
	initialState,
	setOrderData,
	setShowOrderModal,
} from './order.slice';
import { getOrder, getOrderModalState } from './order.selector';
import { getTestState, testOrder } from '@utils/test-utils';

import type { TOrder } from '../../types/order.types';

const testState = getTestState();

describe('orderSlice', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(reducer(undefined, { type: '' })).toEqual(initialState);
		});
	});

	describe('setOrderData', () => {
		it('should set order data correctly', () => {
			const action = setOrderData(testOrder);
			const state = reducer(initialState, action);

			expect(state.order).toEqual(testOrder);
			expect(state.showOrderModal).toBe(initialState.showOrderModal);
		});

		it('should handle partial order data', () => {
			const partialOrder = {
				name: 'Partial order',
				success: false,
			};

			const action = setOrderData({
				...initialState.order,
				...partialOrder,
			} as TOrder);

			const state = reducer(initialState, action);

			expect(state.order.name).toBe('Partial order');
			expect(state.order.success).toBe(false);
			expect(state.order.order.number).toBeDefined();
		});
	});

	describe('setShowOrderModal', () => {
		it('should set showOrderModal to true', () => {
			const action = setShowOrderModal(true);
			const state = reducer(initialState, action);

			expect(state.showOrderModal).toBe(true);
			expect(state.order).toEqual(initialState.order);
		});

		it('should set showOrderModal to false', () => {
			const stateWithModal = reducer(initialState, setShowOrderModal(true));
			const state = reducer(stateWithModal, setShowOrderModal(false));

			expect(state.showOrderModal).toBe(false);
		});
	});

	describe('selectors', () => {
		it('getOrder should return order data', () => {
			expect(getOrder(testState)).toEqual(testState.order.order);
		});

		it('getOrderModalState should return modal state', () => {
			expect(getOrderModalState(testState)).toBe(true);
		});
	});
});
