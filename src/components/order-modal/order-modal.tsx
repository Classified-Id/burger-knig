import React from 'react';
import { useNavigate } from 'react-router-dom';

import { OrderModalContent } from '@components/order-modal-content/order-modal-content';
import { Modal } from '@components/modal';

import './order-modal.module.scss';

export const OrderModal = () => {
	const navigate = useNavigate();

	const closeModal = () => {
		navigate(-1);
	};

	return (
		<Modal onClose={closeModal} header={'Детали ингредиента'}>
			<OrderModalContent />
		</Modal>
	);
};
