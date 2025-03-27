import { useState } from 'react';
import { clsx } from 'clsx';

import { useGetIngredientsQuery } from '@store';

import { ProductsList } from '@components/products-list/products-list';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredients.module.scss';

export const BurgerIngredients = () => {
	const [tab, setTab] = useState('buns');
	const { data, isLoading, error } = useGetIngredientsQuery();

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error || !data) {
		return <p>Произошла ошибка</p>;
	}

	return (
		<section className={styles.ingredients}>
			<h1 className={'mt-10 mb-5 text text_type_main-large'}>
				Соберите бургер
			</h1>

			<div className={clsx('mb-10', styles.tabs)}>
				<Tab value='buns' active={tab === 'buns'} onClick={setTab}>
					Булки
				</Tab>
				<Tab value='sauces' active={tab === 'sauces'} onClick={setTab}>
					Соусы
				</Tab>
				<Tab value='main' active={tab === 'main'} onClick={setTab}>
					Начинки
				</Tab>
			</div>

			{tab === 'buns' && <ProductsList data={data.buns}>Булки</ProductsList>}
			{tab === 'sauces' && (
				<ProductsList data={data.sauces}>Соусы</ProductsList>
			)}
			{tab === 'main' && <ProductsList data={data.mains}>Начинки</ProductsList>}
		</section>
	);
};
