import { useAppSelector, getBurgerData } from '@store';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';

import styles from './app.module.scss';

export const App = () => {
	const burgerData = useAppSelector(getBurgerData);
	console.log(burgerData);

	return (
		<main className={styles.main}>
			<AppHeader />
			<article className={styles.content}>
				<BurgerIngredients />
				<BurgerConstructor />
			</article>
		</main>
	);
};
