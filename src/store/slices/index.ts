import { combineReducers } from '@reduxjs/toolkit';

import { burgerDataApi } from './api/burger-data.api';

import { burgerIngredientsSlice } from './burgerIngredients/burgerIngredients.slice';
import { orderSlice } from './order/order.slice';
import { authUserSlice } from './user-auth/user-auth.slice';
import { ordersSlice } from './orders-slice';

export const rootReducer = combineReducers({
	burgerIngredients: burgerIngredientsSlice.reducer,
	order: orderSlice.reducer,
	authUserSlice: authUserSlice.reducer,
	orders: ordersSlice.reducer,
	[burgerDataApi.reducerPath]: burgerDataApi.reducer,
});
