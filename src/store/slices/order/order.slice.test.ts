import reducer, { initialState, setOrderData, setShowOrderModal } from './order.slice';
import type { TOrder } from '../../types/order.types';
import { getOrder, getOrderModalState } from './order.selector';

describe('orderSlice', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(reducer(undefined, { type: '' })).toEqual(initialState);
		});
	});

	describe('setOrderData', () => {
		it('should set order data correctly', () => {
			const testOrder: TOrder = {
				name: 'Test order',
				order: { number: 123 },
				success: true
			};

			const action = setOrderData(testOrder);
			const state = reducer(initialState, action);

			expect(state.order).toEqual(testOrder);
			expect(state.showOrderModal).toBe(initialState.showOrderModal);
		});

		it('should handle partial order data', () => {
			const partialOrder: Partial<TOrder> = {
				name: 'Partial order',
				success: false
			};

			const action = setOrderData({
				...initialState.order,
				...partialOrder
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
		const testState = {
			order: {
				order: {
					name: 'Test burger',
					order: { number: 456 },
					success: true
				},
				showOrderModal: true
			}
		};

		it('getOrder should return order data', () => {
			expect(getOrder(testState)).toEqual(testState.order.order);
		});

		it('getOrderModalState should return modal state', () => {
			expect(getOrderModalState(testState)).toBe(true);
		});
	});
});
