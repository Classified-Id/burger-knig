import { configureStore } from '@reduxjs/toolkit';
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { rootReducer } from './slices';
import { burgerDataApi } from './slices/api/burger-data.api';

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([burgerDataApi.middleware]),
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

export {
	getCurrentIngredient,
	getIngredientModalState,
} from './slices/ingredientDetails/ingredientDetails.selector';
export {
	setShowModal,
	clearIngredient,
	setIngredient,
} from './slices/ingredientDetails/ingredientDetails.slice';

export { getOrder, getOrderModalState } from './slices/order/order.selector';
export { setOrderData, setShowOrderModal } from './slices/order/order.slice';

export type { TIngredient } from './types/ingredients.types';
