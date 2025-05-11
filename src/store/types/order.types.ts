export type TOrder = {
	name: string;
	order: { number: number };
	success: boolean;
};

export type TOrderSliceInitState = {
	order: TOrder;
	showOrderModal: boolean;
};

export type TForgotAndNewPassResponse = {
	success: boolean;
	message: string;
};
