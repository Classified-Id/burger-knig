import { combineReducers } from '@reduxjs/toolkit';

import { burgerDataApi } from './api/burger-data.api';

import { burgerIngredientsSlice } from './burgerIngredients/burgerIngredients.slice';
import { orderSlice } from './order/order.slice';
import { ingredientDetailsSlice } from './ingredientDetails/ingredientDetails.slice';
import { authUserSlice } from './user-auth/user-auth.slice';

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsSlice.reducer,
	currentIngredient: ingredientDetailsSlice.reducer,
	order: orderSlice.reducer,
	authUserSlice: authUserSlice.reducer,
	[burgerDataApi.reducerPath]: burgerDataApi.reducer,
});
