import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@store';

type TBurgerSliceInitState = {
	ingredient: TIngredient;
	showModal: boolean;
};

const initialState: TBurgerSliceInitState = {
	ingredient: {
		calories: 0,
		carbohydrates: 0,
		fat: 0,
		image: '',
		image_large: '',
		image_mobile: '',
		name: '',
		price: 0,
		proteins: 0,
		type: 'bun',
		_id: '',
	},
	showModal: false,
};

export const ingredientDetailsSlice = createSlice({
	name: 'ingredientDetails',
	initialState,
	reducers: {
		setIngredient(state, action: PayloadAction<TIngredient>) {
			state.ingredient = action.payload;
		},

		clearIngredient(state) {
			state.ingredient = initialState.ingredient;
		},

		setShowModal(state, action: PayloadAction<boolean>) {
			state.showModal = action.payload;
		},
	},
});

export const { setIngredient, clearIngredient, setShowModal } =
	ingredientDetailsSlice.actions;
