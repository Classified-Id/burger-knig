import React from 'react';

import styles from './ingredient-details.module.scss';

import type { FC } from 'react';
import type { TIngredient } from '@store';

type IngredientProps = {
	ingredient?: TIngredient;
};

export const IngredientDetails: FC<IngredientProps> = ({ ingredient }) => {
	return (
		<section className={styles.productPortal}>
			<img
				src={ingredient?.image_large}
				alt={ingredient?.name}
				className={styles.image}
			/>
			<span className='text text_type_main-medium'>{ingredient?.name}</span>
			<div className={styles.productSaturation}>
				<span className='text text_type_main-small text_color_inactive'>
					Калории, ккал
					<br />
					{ingredient?.calories}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Белки, г<br />
					{ingredient?.proteins}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Жиры, г<br />
					{ingredient?.fat}
				</span>
				<span className='text text_type_main-small text_color_inactive'>
					Углеводы, г<br />
					{ingredient?.carbohydrates}
				</span>
			</div>
		</section>
	);
};
