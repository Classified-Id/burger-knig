import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@store';

type TIngredientsSliceInitState = {
	ingredients: TIngredient[];
};

const initialState: TIngredientsSliceInitState = {
	ingredients: [],
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		setIngredientsData(state, action: PayloadAction<TIngredient[]>) {
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload],
			};
		},
	},
});

export const { setIngredientsData } = ingredientsSlice.actions;
