import React from 'react';

import { OrderListItem } from '@components/orders-list-item/orders-list-item';
import { useAppSelector } from '@store';

import styles from './profile-orders.module.scss';

export const ProfileOrders = () => {
	const { data, status } = useAppSelector((state) => state.orders);

	if (status === 'error') {
		return <div>Ошибка при загрузке заказов</div>;
	}

	if (data?.orders?.length && status === 'connected') {
		return (
			<section className={styles.wrapper}>
				{data.orders.map((order) => (
					<OrderListItem key={order._id} {...order} />
				))}
			</section>
		);
	}

	return <div>Загрузка...</div>;
};
