export type TOrder = {
	name: string;
	order: { number: number };
	success: boolean;
};

export type TOrderSliceInitState = {
	order: TOrder;
	showOrderModal: boolean;
};

export type TForgotPassResponse = {
	success: boolean;
	message: string;
};
