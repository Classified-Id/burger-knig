import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector, useLazyGetOrderByIdQuery } from '@store';
import { OrderModalContent } from '@components/order-modal-content/order-modal-content';

import styles from './order-page.module.scss';

export function OrderPage() {
	const { id } = useParams();

	// сделать развилку потом, выбирать или из одного стора с заказами (из всех) либо из моих собственных, вида:
	// const { data, status } = useAppSelector((state) =>
	// 	location.pathname.startsWith('/profile') ? state.auth : state.orders
	// );

	const [fetchOrder] = useLazyGetOrderByIdQuery();

	const { data } = useAppSelector((state) => state.orders);

	useEffect(() => {
		if (!id) return;
		const currentOrder = data?.orders.find((order) => order._id === id);
		if (!currentOrder) {
			fetchOrder({
				orderId: id,
			});
		}
	}, [data, fetchOrder, id]);

	return (
		<main className={`${styles.main} pt-26`}>
			<OrderModalContent />
		</main>
	);
}
