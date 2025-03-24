import { useState } from 'react';

import { useGetIngredientsQuery } from '@store';

import { ProductsList } from '@components/products-list/products-list';
import { Modal } from '@components/modal';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredients = () => {
	const [tab, setTab] = useState('buns');
	const [showModal, setShowModal] = useState(false);
	const { data, isLoading, error } = useGetIngredientsQuery();

	if (isLoading) {
		return <p>Загрузка...</p>;
	}

	if (error || !data) {
		return <p>Произошла ошибка</p>;
	}

	const onClose = () => {
		setShowModal(!showModal);
	};

	return (
		<section style={{ width: '600px', overflow: 'hidden' }}>
			<h1 className={'mt-10 mb-5 text text_type_main-large'}>
				Соберите бургер
			</h1>

			<button onClick={onClose}>Открыть модалку</button>

			<div style={{ display: 'flex', width: '600px' }} className={'mb-10'}>
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

			{showModal && (
				<Modal onClose={onClose}>
					<div>Тестовое содержимое модалки</div>
				</Modal>
			)}
		</section>
	);
};
