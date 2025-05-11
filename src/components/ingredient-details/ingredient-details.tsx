import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetIngredientsQuery } from '@store';

import styles from './ingredient-details.module.scss';

import type { FC } from 'react';

type IngredientProps = {
	fromModal?: boolean;
};

export const IngredientDetails: FC<IngredientProps> = ({
	fromModal = false,
}) => {
	const { id } = useParams();

	const { data, isFetching, isError } = useGetIngredientsQuery();

	const allIngredients = data
		? [...data.buns, ...data.mains, ...data.sauces]
		: [];

	const currentIngredient = allIngredients.find((item) => item._id === id);

	if (isFetching) {
		return (
			<section className={styles.productPortal}>
				<h1>Загрузка</h1>
			</section>
		);
	}

	if (!currentIngredient || isError) {
		return (
			<section className={styles.productPortal}>
				<h1>Ингредиент не найден</h1>
			</section>
		);
	}

	return (
		<section className={styles.productPortal}>
			{!fromModal && <h1>Детали ингредиента</h1>}
			<img
				src={currentIngredient.image_large}
				alt={currentIngredient.name}
				className={styles.image}
			/>
			<span className='text text_type_main-medium'>
				{currentIngredient.name}
			</span>
			<div className={styles.productSaturation}>
				<span className='text text_type_main-small text_color_inactive'>
					Калории, ккал
					<br />
					{currentIngredient.calories}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Белки, г<br />
					{currentIngredient.proteins}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Жиры, г<br />
					{currentIngredient.fat}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Углеводы, г<br />
					{currentIngredient.carbohydrates}
				</span>
			</div>
		</section>
	);
};
