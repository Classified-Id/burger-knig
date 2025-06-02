import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';
import { ModalIngredient } from '@components/modalIngredient/modalIngredient';
import { ModalOrder } from '@components/modalOrder/modalOrder';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import {
	ForgotPassPage,
	ResetPassPage,
	RegisterPage,
	ProfilePage,
	OrdersPage,
	LoginPage,
	ErrorPage,
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

				<Route path='/feed' element={<OrdersPage />}>
					<Route path=':number' element={<div>Orders Details</div>} />
				</Route>

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
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<ModalIngredient />} />

					<Route
						path='/feed/:number'
						element={<div>Сделать компонент с модалкой для этой истории</div>}
						// element={
						// 	<Modal title={'#' + location.pathname.split('/').pop()} onClose={handleCloseModalOrderInfo}>
						// 		<OrderInfoModal />
						// 	</Modal>
						// }
					/>
				</Routes>
			)}
		</div>
	);
};
