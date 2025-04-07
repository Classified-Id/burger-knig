import type { RootState } from '@store';

export const getCurrentIngredient = (state: RootState) =>
	state.currentIngredient.ingredient;

export const getIngredientModalState = (state: RootState) =>
	state.currentIngredient.showModal;
