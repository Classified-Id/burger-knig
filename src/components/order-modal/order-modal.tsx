import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch, addOrder} from '@store';
import { OrderModalContent } from '@components/order-modal-content/order-modal-content';
import { Modal } from '@components/modal';

import './order-modal.module.scss';

export const OrderModal = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { data: orders } = useAppSelector((state) => state.orders);

	const closeModal = () => {
		navigate(-1);
	};

	useEffect(() => {
		const currentOrder = orders?.orders.find((order) => order._id === id);

		currentOrder && dispatch(addOrder(currentOrder));
	}, [id, orders]);

	return (
		<Modal onClose={closeModal} header={'Детали ингредиента'}>
			<OrderModalContent />
		</Modal>
	);
};
