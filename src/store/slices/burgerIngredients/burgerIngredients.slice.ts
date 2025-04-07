import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@store';

type TBurgerSliceInitState = {
	ingredients: TIngredient[];
	bun: TIngredient | null;
};

const initialState: TBurgerSliceInitState = {
	ingredients: [],
	bun: null,
};

export const burgerIngredientsSlice = createSlice({
	name: 'burgerIngredients',
	initialState,
	reducers: {
		addBurgerIngredient(state, action: PayloadAction<TIngredient>) {
			return {
				...state,
				ingredients: [
					...state.ingredients,
					{ idKey: uuid4(), ...action.payload },
				],
			};
		},
		setBurgerBuns(state, action: PayloadAction<TIngredient>) {
			return {
				...state,
				bun: action.payload,
			};
		},
		deleteBurgerIngredient(state, action: PayloadAction<number>) {
			return {
				...state,
				ingredients: state.ingredients.filter(
					(_, index) => index !== action.payload
				),
			};
		},
		sortBurgerIngredients(state, action: PayloadAction<TIngredient[]>) {
			return {
				...state,
				ingredients: action.payload,
			};
		},
	},
});

export const {
	addBurgerIngredient,
	setBurgerBuns,
	deleteBurgerIngredient,
	sortBurgerIngredients,
} = burgerIngredientsSlice.actions;
