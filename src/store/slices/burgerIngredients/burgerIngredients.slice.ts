import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@store';

type TBurgerSliceInitState = {
	ingredients: TIngredient[];
	bun: null | [];
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
				ingredients: [...state.ingredients, action.payload],
			};
		},
		setBurgerBuns(state, action: PayloadAction<TIngredient>) {
			return {
				...state,
				bunt: action.payload,
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
