import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector, disconnect, connect } from '@store';
import { WSS_URL_ORDERS } from '@constants';
import { OrderListItem } from '@components/orders-list-item/orders-list-item';
import { OrderStats } from '@components/order-stats/order-stats';

import styles from './feed.module.scss';

export const FeedPage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(connect(WSS_URL_ORDERS));

		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	const { data, status } = useAppSelector((state) => state.orders);

	console.log(data?.orders, '111');

	if (status === 'error') {
		return <div>Ошибка при загрузке заказов</div>;
	}

	if (data?.orders?.length && status === 'connected') {
		return (
			<main className={styles.ordersWrapper}>
				<h1 className='mt-10 mb-5 text_type_main-large'>Лента заказов</h1>
				<article className={styles.feed}>
					<section className={styles.wrapper}>
						{data.orders.map((order) => (
							<OrderListItem key={order._id} {...order} />
						))}
					</section>
					<OrderStats
						total={data.total}
						totalToday={data.totalToday}
						orders={data.orders}
					/>
				</article>
			</main>
		);
	}

	return <div>Загрузка...</div>;
};
