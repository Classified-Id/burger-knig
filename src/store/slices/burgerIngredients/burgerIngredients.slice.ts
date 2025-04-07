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
		addBurgerIngredient: {
			reducer(state, action: PayloadAction<TIngredient>) {
				state.ingredients.push(action.payload);
			},
			prepare(ingredient: TIngredient) {
				const idKey = uuid4();
				return {
					payload: {
						...ingredient,
						idKey,
					},
				};
			},
		},
		setBurgerBuns(state, action: PayloadAction<TIngredient>) {
			state.bun = action.payload;
		},
		deleteBurgerIngredient(state, action: PayloadAction<number>) {
			state.ingredients = state.ingredients.filter(
				(_, index) => index !== action.payload
			);
		},
		sortBurgerIngredients(
			state,
			action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
		) {
			const { dragIndex, hoverIndex } = action.payload;
			const draggedItem = state.ingredients[dragIndex];
			const hoveredItem = state.ingredients[hoverIndex];
			const sortedIngredients = [...state.ingredients];

			sortedIngredients[dragIndex] = hoveredItem;
			sortedIngredients[hoverIndex] = draggedItem;
			state.ingredients = sortedIngredients;
		},
	},
});

export const {
	addBurgerIngredient,
	setBurgerBuns,
	deleteBurgerIngredient,
	sortBurgerIngredients,
} = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;
