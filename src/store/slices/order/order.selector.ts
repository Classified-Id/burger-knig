import type { RootState } from '@store';

export const getOrder = (state: RootState) => state.order.order;

export const getOrderModalState = (state: RootState) =>
	state.order.showOrderModal;
