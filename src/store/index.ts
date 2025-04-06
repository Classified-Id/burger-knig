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

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export { rootReducer } from './slices';

export { useGetIngredientsQuery } from './slices/api/burger-data.api';
export {
	getBurgerIngredients,
	getBurgerBuns,
} from './slices/burgerIngredients/burgerIngredients.selector';

export type { TIngredient } from './types/ingredients.types';
