import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { ModalIngredient } from '@components/modalIngredient/modalIngredient';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { ProfileOrders } from '@components/profile-orders/profile-orders';
import { OrderModal } from '@components/order-modal/order-modal';
import { ModalOrder } from '@components/modalOrder/modalOrder';
import { AppHeader } from '@components/app-header/app-header';
import { Profile } from '@components/profile/profile';

import {
	ForgotPassPage,
	ResetPassPage,
	RegisterPage,
	ProfilePage,
	OrderPage,
	LoginPage,
	ErrorPage,
	FeedPage,
} from '@pages/index';

import styles from './app.module.scss';

export const App = () => {
	const location = useLocation();
	const background = location?.state?.background;

	return (
		<div className={styles.main}>
			<AppHeader />

			<Routes location={background || location}>
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
							<ModalOrder />
						</>
					}
				/>

				<Route path='/ingredients/:id' element={<IngredientDetails />} />

				<Route path='/feed' element={<FeedPage />} />
				<Route path='/feed/:id' element={<OrderPage />} />

				<Route
					path='/profile'
					element={
						<ProtectedRoute path='profile' forAuth>
							<ProfilePage />
						</ProtectedRoute>
					}>
					<Route index element={<Profile />} />
					<Route path='orders' element={<ProfileOrders />} />
				</Route>

				<Route path='/profile/orders/:id' element={<OrderPage />} />

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
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<ModalIngredient />} />

					<Route path='/feed/:id' element={<OrderModal />} />
					<Route path='/profile/orders/:id' element={<OrderModal />} />
				</Routes>
			)}
		</div>
	);
};
