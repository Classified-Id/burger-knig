import React from 'react';

import type { FC } from 'react';
import type {
	OrderStatsProps,
	OrderStatsColumnProps,
	OrderStatsProgressDoneProps,
} from './order-stats.props';

import styles from './order-stats.module.scss';

const ProgressColumn: FC<OrderStatsColumnProps> = ({
	title,
	orders,
	style,
}) => {
	return (
		<div className={styles.columnRoot}>
			<h3 className='text text_type_main-medium mb-6'>{title}</h3>
			<div className={styles.column}>
				{orders.map((order) => (
					<p
						key={order._id}
						className={`${styles.item} text text_type_digits-default`}
						style={style}>
						{order.number}
					</p>
				))}
			</div>
		</div>
	);
};

const ProgressDone: FC<OrderStatsProgressDoneProps> = ({ title, total }) => {
	return (
		<div className={styles.done}>
			<h3 className='text text_type_main-medium'>{title}</h3>
			<div
				className='text text_type_digits-large'
				style={{
					textShadow: '0 4px 32px rgb(51 51 255 / 50%)',
				}}>
				{total}
			</div>
		</div>
	);
};

export const OrderStats: FC<OrderStatsProps> = ({
	total,
	totalToday,
	orders,
}) => {
	const ordersDone = orders
		.filter((order) => order.status === 'done')
		.slice(0, 10);
	const ordersPending = orders
		.filter((order) => order.status === 'pending')
		.slice(0, 10);

	return (
		<aside className={styles.aside}>
			<div className={styles.top}>
				<ProgressColumn
					title='Готовы:'
					orders={ordersDone}
					style={{ color: '#00CCCC' }}
				/>
				<ProgressColumn title='В работе:' orders={ordersPending} />
			</div>
			<ProgressDone title='Выполнено за все время:' total={total} />
			<ProgressDone title='Выполнено за сегодня:' total={totalToday} />
		</aside>
	);
};
