import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '@components/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

export const ModalIngredient = () => {
	const navigate = useNavigate();

	const closeModal = () => {
		navigate(-1);
	};

	return (
		<Modal onClose={closeModal} header={'Детали ингредиента'}>
			<IngredientDetails fromModal={true} />
		</Modal>
	);
};
