import { useState } from 'react';

import { ProductsList } from '@components/products-list/products-list';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerIngredients = () => {
	const [tab, setTab] = useState('one');

	return (
		<section>
			<h1
				style={{ width: '600px' }}
				className={'mt-10 mb-5 text text_type_main-large'}>
				Соберите бургер
			</h1>

			<div style={{ display: 'flex', width: '600px' }} className={'mb-10'}>
				<Tab value='one' active={tab === 'one'} onClick={setTab}>
					Булки
				</Tab>
				<Tab value='two' active={tab === 'two'} onClick={setTab}>
					Соусы
				</Tab>
				<Tab value='three' active={tab === 'three'} onClick={setTab}>
					Начинки
				</Tab>
			</div>

			{tab === 'one' && <ProductsList>Булки</ProductsList>}
			{tab === 'two' && <ProductsList>Соусы</ProductsList>}
			{tab === 'three' && <ProductsList>Начинки</ProductsList>}
		</section>
	);
};
