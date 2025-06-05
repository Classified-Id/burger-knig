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
	status: 'done' | 'created' | 'pending';
	ingredients: string[];
	createdAt: string;
	updatedAt: string;
	number: number;
	name: string;
	_id: string;
};

export type OrderMessageType = {
	orders: OrderType[];
	success: boolean;
	total: number;
	totalToday: number;
};
