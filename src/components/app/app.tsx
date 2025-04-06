import { useAppSelector, getBurgerIngredients } from '@store';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

import styles from './app.module.scss';

export const App = () => {
	const burgerData = useAppSelector(getBurgerIngredients);
	console.log(burgerData);

	return (
		<div className={styles.main}>
			<AppHeader />
			<main className={styles.content}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
		</div>
	);
};
