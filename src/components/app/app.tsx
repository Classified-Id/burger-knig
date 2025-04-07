import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppSelector, getBurgerIngredients } from '@store';
import { AppHeader } from '@components/app-header/app-header';
import { ModalIngredient } from '@components/modalIngredient/modalIngredient';
import { ModalOrder } from '@components/modalOrder/modalOrder';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

import styles from './app.module.scss';

export const App = () => {
	const burgerData = useAppSelector(getBurgerIngredients);
	console.log(burgerData);

	return (
		<div className={styles.main}>
			<AppHeader />
			<DndProvider backend={HTML5Backend}>
				<main className={styles.content}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</DndProvider>
			<ModalIngredient />
			<ModalOrder />
		</div>
	);
};
