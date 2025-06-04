import type { OrderType } from '../../types/order.types';

export type ListOrdersItemProps = {
	hasStatus?: boolean;
} & OrderType;
