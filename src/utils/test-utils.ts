import type { RootState, TIngredient } from '@store';

import type { TOrder } from '../store/types/order.types';

export const testIngredient: TIngredient = {
	_id: '60d3b41abdacab0026a733c6',
	name: 'Test Ingredient',
	type: 'main',
	proteins: 100,
	fat: 100,
	carbohydrates: 100,
	calories: 100,
	price: 100,
	image: 'test-image.jpg',
	image_mobile: 'test-image-mobile.jpg',
	image_large: 'test-image-large.jpg',
};

export const testOrder: TOrder = {
	name: 'Test burger',
	order: { number: 456 },
	success: true,
};

export const getTestState = (): RootState =>
	({
		order: {
			order: testOrder,
			showOrderModal: true,
		},
		burgerIngredients: {
			ingredients: [testIngredient],
			bun: testIngredient,
		},
		authUserSlice: {},
		orders: {},
		burgerDataApi: {},
	} as unknown as RootState);
