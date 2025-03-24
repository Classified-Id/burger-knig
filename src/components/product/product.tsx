import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './product.module.scss';

import type { FC } from 'react';
import type { TIngredient } from '@store';

type productType = {
	data: TIngredient;
};

export const Product: FC<productType> = ({ data }) => {
	return (
		<a href='/test'>
			<figure className={styles.card}>
				<img src={data.image} alt={data.name} className={'ml-4 mr-4 mb-1'} />
				<figcaption
					style={{ display: 'flex', gap: '8px' }}
					className={'mb-1 text text_type_digits-default'}>
					{data.price}
					<CurrencyIcon type='primary' />
				</figcaption>
				<figcaption
					style={{ height: '48px' }}
					className={'text text_type_main-small'}>
					{data.name}
				</figcaption>
			</figure>
		</a>
	);
};
