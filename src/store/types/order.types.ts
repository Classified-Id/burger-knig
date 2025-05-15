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
