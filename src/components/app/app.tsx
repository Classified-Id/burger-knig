import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';

// import { useAppDispatch } from '@store';

import { AppHeader } from '@components/app-header/app-header';
import { ModalIngredient } from '@components/modalIngredient/modalIngredient';
import { ModalOrder } from '@components/modalOrder/modalOrder';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
// import { ProfileForm } from '@components/profile-form/profile-form';
// import { OrderHistory } from '@components/order-history/order-history';
// import { OrderDetails } from '@components/order-details/order-details';

import {
	ForgotPassPage,
	ResetPassPage,
	RegisterPage,
	ProfilePage,
	LoginPage,
	ErrorPage,
} from '@pages/index';

import styles from './app.module.scss';

export const App = () => {
	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();
	const location = useLocation();
	const backgroundStateLocation = location?.state?.background;

	//todo тут будут вызываться основные запросы на получение данных о ингредиентах, авторизации, заказах и т.д.

	return (
		<div className={styles.main}>
			<AppHeader />

			<Routes location={backgroundStateLocation || location}>
				<Route
					path='/'
					element={
						<>
							<DndProvider backend={HTML5Backend}>
								<main className={styles.content}>
									<BurgerIngredients />
									<BurgerConstructor />
								</main>
							</DndProvider>
							<ModalIngredient />
							<ModalOrder />
						</>
					}
				/>

				<Route path='/ingredients/:id' element={<IngredientDetails />} />

				<Route
					path='/profile'
					element={
						<ProtectedRoute path='/profile' forAuth>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/login'
					element={
						<ProtectedRoute path='/login'>
							<LoginPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/forgot-password'
					element={
						<ProtectedRoute path='/forgot-password'>
							<ForgotPassPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/reset-password'
					element={
						<ProtectedRoute path='/reset-password'>
							<ResetPassPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/register'
					element={
						<ProtectedRoute path='/register'>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>

				<Route path='*' element={<ErrorPage />} />

				{backgroundStateLocation && (
					<Route path='/ingredients/:id'>
						<ModalIngredient />
					</Route>
				)}
				{backgroundStateLocation && (
					<Route path='/order/:orderId'>
						<ModalOrder />
					</Route>
				)}
			</Routes>
		</div>
	);
};
