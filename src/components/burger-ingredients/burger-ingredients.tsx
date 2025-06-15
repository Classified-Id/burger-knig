import { useRef } from 'react';
import { clsx } from 'clsx';

import { useGetIngredientsQuery } from '@store';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProductsList } from '@components/products-list/products-list';
import { useScrollIngredients } from '@hooks/useScrollIngredients';

import styles from './burger-ingredients.module.scss';

export const BurgerIngredients = () => {
	const { data, isLoading, error } = useGetIngredientsQuery();

	const bunsRef = useRef<HTMLHeadingElement>(null);
	const saucesRef = useRef<HTMLHeadingElement>(null);
	const mainsRef = useRef<HTMLHeadingElement>(null);
	const containerRef = useRef<HTMLUListElement>(null);

	const { activeTab, scrollToSection } = useScrollIngredients(
		[bunsRef, saucesRef, mainsRef],
		containerRef,
		['buns', 'sauces', 'main']
	);

	if (isLoading) return <p>Загрузка...</p>;
	if (error || !data) return <p>Произошла ошибка</p>;

	return (
		<section className={styles.ingredients}>
			<h1 className={'mt-10 mb-5 text text_type_main-large'}>
				Соберите бургер
			</h1>

			<div className={clsx('mb-10', styles.tabs)}>
				<Tab
					value='buns'
					active={activeTab === 'buns'}
					onClick={scrollToSection('buns')}>
					Булки
				</Tab>
				<Tab
					value='sauces'
					active={activeTab === 'sauces'}
					onClick={scrollToSection('sauces')}>
					Соусы
				</Tab>
				<Tab
					value='main'
					active={activeTab === 'main'}
					onClick={scrollToSection('main')}>
					Начинки
				</Tab>
			</div>

			<ul className={styles.ingredientsList} ref={containerRef}>
				<ProductsList data={data.buns} ref={bunsRef} id={'bun'}>
					Булки
				</ProductsList>
				<ProductsList data={data.sauces} ref={saucesRef} id={'sauce'}>
					Соусы
				</ProductsList>
				<ProductsList data={data.mains} ref={mainsRef} id={'main'}>
					Начинки
				</ProductsList>
			</ul>
		</section>
	);
};
