import { expect, describe, it } from '@jest/globals';
import reducer, {
	initialState,
	addBurgerIngredient,
	setBurgerBuns,
	deleteBurgerIngredient,
	sortBurgerIngredients,
} from './burgerIngredients.slice';
import {
	getBurgerIngredients,
	getBurgerBuns,
} from './burgerIngredients.selector';
import { getTestState, testIngredient } from '@utils/test-utils';

const testState = getTestState();

describe('burgerIngredientsSlice', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(reducer(undefined, { type: '' })).toEqual(initialState);
		});
	});

	describe('addBurgerIngredient', () => {
		it('should add ingredient with unique idKey', () => {
			const action = addBurgerIngredient(testIngredient);
			const state = reducer(initialState, action);

			expect(state.ingredients).toHaveLength(1);
			expect(state.ingredients[0]).toMatchObject(testIngredient);
			expect(state.ingredients[0].idKey).toBeDefined();
			expect(typeof state.ingredients[0].idKey).toBe('string');
		});

		it('should not modify bun when adding ingredient', () => {
			const stateWithBun = { ...initialState, bun: testIngredient };
			const action = addBurgerIngredient(testIngredient);
			const state = reducer(stateWithBun, action);

			expect(state.bun).toEqual(testIngredient);
		});
	});

	describe('setBurgerBuns', () => {
		it('should set bun', () => {
			const action = setBurgerBuns(testIngredient);
			const state = reducer(initialState, action);

			expect(state.bun).toEqual(testIngredient);
			expect(state.ingredients).toHaveLength(0);
		});

		it('should replace existing bun', () => {
			const newBun = { ...testIngredient, _id: 'new-id', name: 'New Bun' };
			const stateWithBun = { ...initialState, bun: testIngredient };
			const action = setBurgerBuns(newBun);
			const state = reducer(stateWithBun, action);

			expect(state.bun).toEqual(newBun);
		});
	});

	describe('deleteBurgerIngredient', () => {
		it('should delete ingredient by index', () => {
			const stateWithIngredients = {
				...initialState,
				ingredients: [testIngredient, { ...testIngredient, _id: 'second' }],
			};
			const action = deleteBurgerIngredient(0);
			const state = reducer(stateWithIngredients, action);

			expect(state.ingredients).toHaveLength(1);
			expect(state.ingredients[0]._id).toBe('second');
		});

		it('should not modify bun when deleting ingredient', () => {
			const stateWithBunAndIngredients = {
				...initialState,
				bun: testIngredient,
				ingredients: [testIngredient],
			};
			const action = deleteBurgerIngredient(0);
			const state = reducer(stateWithBunAndIngredients, action);

			expect(state.bun).toEqual(testIngredient);
		});
	});

	describe('sortBurgerIngredients', () => {
		it('should swap ingredients', () => {
			const ingredients = [
				testIngredient,
				{ ...testIngredient, _id: 'second' },
				{ ...testIngredient, _id: 'third' },
			];
			const stateWithIngredients = { ...initialState, ingredients };
			const action = sortBurgerIngredients({ dragIndex: 0, hoverIndex: 2 });
			const state = reducer(stateWithIngredients, action);

			expect(state.ingredients[0]._id).toBe('second');
			expect(state.ingredients[1]._id).toBe('third');
			expect(state.ingredients[2]._id).toBe(testIngredient._id);
		});

		it('should not modify bun when sorting ingredients', () => {
			const ingredients = [
				testIngredient,
				{ ...testIngredient, _id: 'second' },
			];
			const stateWithBunAndIngredients = {
				...initialState,
				bun: testIngredient,
				ingredients,
			};
			const action = sortBurgerIngredients({ dragIndex: 0, hoverIndex: 1 });
			const state = reducer(stateWithBunAndIngredients, action);

			expect(state.bun).toEqual(testIngredient);
		});
	});
});

describe('burgerIngredients selectors', () => {
	it('getBurgerIngredients should return ingredients', () => {
		expect(getBurgerIngredients(testState)).toEqual([testIngredient]);
	});

	it('getBurgerBuns should return bun', () => {
		expect(getBurgerBuns(testState)).toEqual(testIngredient);
	});
});
