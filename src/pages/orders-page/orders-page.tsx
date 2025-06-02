import React from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { clsx } from 'clsx';

import { WebsocketStatus } from '@constants';
import { OrderList } from '@components/order-list/order-list';
import { OrderStats } from '@components/order-stats/order-stats';

import type { IOrder } from '../../types/order.types';
import type { FC } from 'react';

import styles from './orders-page.module.scss';

export const OrdersPage: FC = () => {
	const match = useMatch('/feed/:number');
	const status: WebsocketStatus = WebsocketStatus.ONLINE;
	const error = false;
	const ordersWithPrices: IOrder[] = [];

	console.log('match', match);

	return (
		<div className={styles.wrapper}>
			<main className={clsx(styles.main, { [styles.outletMain]: match })}>
				{match ? (
					<Outlet />
				) : (
					<>
						{String(status) === String(WebsocketStatus.OFFLINE) && (
							<div>Нет соединения</div>
						)}

						{status !== String(WebsocketStatus.OFFLINE) && !error && (
							<>
								<OrderList orders={ordersWithPrices} size='small' />
								<OrderStats />
							</>
						)}
					</>
				)}
			</main>
		</div>
	);
};
