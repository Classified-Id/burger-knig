import type { RootState } from '@store';

export const getBurgerIngredients = (state: RootState) =>
	state.burgerIngredients.ingredients;

export const getBurgerBuns = (state: RootState) => state.burgerIngredients.bun;
