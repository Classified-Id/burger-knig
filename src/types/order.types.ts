export interface IOrder {
	name: string;
	ingredients: string[];
	_id: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	owner?: string;
}

export type OrderType = {
	name: string;
	ingredients: string[];
	_id: string;
	status: 'done' | 'created' | 'pending';
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type OrderMessageType = {
	orders: OrderType[];
	success: boolean;
	total: number;
	totalToday: number;
};
