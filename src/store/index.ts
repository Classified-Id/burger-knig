import { configureStore } from '@reduxjs/toolkit';
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer } from './slices';
import { burgerDataApi } from './slices/api/burger-data.api';
import { createWebSocketMiddleware } from './socket-middleware';

import {
	connect,
	disconnect,
	onConnected,
	onDisconnected,
	sendMessage,
	onMessageReceived,
	onError,
} from './slices/orders-slice';

import type { OrderMessageType } from '../types/order.types';

const ordersWebSocketMiddleware = createWebSocketMiddleware<OrderMessageType>(
	{
		connect,
		disconnect,
		onConnected,
		onDisconnected,
		sendMessage,
		onMessageReceived,
		onError,
	},
	{ withTokenRefresh: false }
);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([
			burgerDataApi.middleware,
			ordersWebSocketMiddleware,
		]),
	devTools: true,
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { rootReducer } from './slices';
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export {
	useGetIngredientsQuery,
	useSendOrderMutation,
	useSendEmailCodeMutation,
	useSendNewPasswordMutation,
	useSendRegisterMutation,
	useSendLoginMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useRefreshTokenMutation,
	useLogoutMutation,
	useLazyGetOrderByIdQuery,
} from './slices/api/burger-data.api';

export {
	getBurgerIngredients,
	getBurgerBuns,
} from './slices/burgerIngredients/burgerIngredients.selector';
export {
	addBurgerIngredient,
	setBurgerBuns,
	deleteBurgerIngredient,
	sortBurgerIngredients,
} from './slices/burgerIngredients/burgerIngredients.slice';

export { getOrder, getOrderModalState } from './slices/order/order.selector';
export { setOrderData, setShowOrderModal } from './slices/order/order.slice';

export type { TIngredient } from './types/ingredients.types';

export {
	connect,
	disconnect,
	onConnected,
	onDisconnected,
	sendMessage,
	onMessageReceived,
	onError,
	addOrder,
	removeOrder,
} from './slices/orders-slice';
