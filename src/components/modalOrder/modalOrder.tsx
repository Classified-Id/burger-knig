import React from 'react';

import {
	useAppSelector,
	useAppDispatch,
	setShowOrderModal,
	getOrderModalState,
} from '@store';
import { Modal } from '@components/modal';
import { OrderDetails } from '@components/order-details/order-details';

export const ModalOrder = () => {
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(getOrderModalState);

	const closeModal = () => dispatch(setShowOrderModal(false));

	if (!showModal) {
		return null;
	}

	return (
		<Modal onClose={closeModal}>
			<OrderDetails />
		</Modal>
	);
};
