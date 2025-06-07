import { OrderType } from '../../types/order.types';

export type TOrder = {
	order: { number: number };
	success: boolean;
	name: string;
};

export type TOrderSliceInitState = {
	showOrderModal: boolean;
	order: TOrder;
};

export type TForgotAndNewPassResponse = {
	success: boolean;
	message: string;
};

export type TGetOrderProps = {
	orderId: string;
};

export type TGetOrderResponse = {
	success: boolean;
	orders: OrderType[];
};
