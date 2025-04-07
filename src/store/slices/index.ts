import { combineReducers } from '@reduxjs/toolkit';

import { burgerDataApi } from './api/burger-data.api';

import { burgerIngredientsSlice } from './burgerIngredients/burgerIngredients.slice';
import { orderSlice } from './order/order.slice';
import { ingredientDetailsSlice } from './ingredientDetails/ingredientDetails.slice';

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsSlice.reducer,
	currentIngredient: ingredientDetailsSlice.reducer,
	order: orderSlice.reducer,
	[burgerDataApi.reducerPath]: burgerDataApi.reducer,
});
