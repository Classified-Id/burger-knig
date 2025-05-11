import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
	useAppSelector,
	useAppDispatch,
	// getCurrentIngredient,
	getIngredientModalState,
	setShowModal,
	clearIngredient,
} from '@store';
import { Modal } from '@components/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

export const ModalIngredient = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(getIngredientModalState);
	// const currentIngredient = useAppSelector(getCurrentIngredient);

	const closeModal = () => {
		navigate(-1);
		dispatch(setShowModal(false));
		dispatch(clearIngredient());
	};

	if (!showModal) {
		return null;
	}

	return (
		<Modal onClose={closeModal} header={'Детали ингредиента'}>
			<IngredientDetails fromModal={true} />
		</Modal>
	);
};
