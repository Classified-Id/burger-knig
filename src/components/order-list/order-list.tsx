import React from 'react';

import type { IOrder } from '../../types/order.types';
import type { FC } from 'react';

import styles from './order-list.module.scss';

interface OrderComponentProps {
	orders: IOrder[];
	size: 'large' | 'small';
}

export const OrderList: FC<OrderComponentProps> = ({ orders, size }) => {
	const bigSize: boolean = size === 'large';

	const printOrders = [];
	for (let i = 0; i < orders.length; i++) {
		printOrders.push(<div>123</div>);
	}

	return (
		<section
			className={
				size === 'large' ? styles.wrapper : styles.orders_section_small
			}>
			{!bigSize && (
				<p className='text text text_type_main-large'>Лента заказов</p>
			)}
			<div
				className={
					size === 'large'
						? `${styles.orders_container} pb-4 `
						: `${styles.orders_small} pb-4 `
				}>
				<>{printOrders}</>
			</div>
		</section>
	);
};
