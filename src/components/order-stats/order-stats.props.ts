import type { OrderType } from '../../types/order.types';
import type { ReactNode, CSSProperties } from 'react';

export type OrderStatsProps = {
	orders: OrderType[];
	total: number;
	totalToday: number;
};

export type OrderStatsColumnProps = {
	title: string;
	children?: ReactNode;
	orders: OrderType[];
	style?: CSSProperties;
};

export type OrderStatsProgressDoneProps = {
	title: string;
	total: number;
};
