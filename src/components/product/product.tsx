import { clsx } from 'clsx';
import { useDrag } from 'react-dnd';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppDispatch, setShowModal, setIngredient } from '@store';

import styles from './product.module.scss';

import type { FC } from 'react';
import type { ProductType } from './product.props';

export const Product: FC<ProductType> = ({ ingredient }) => {
	const dispatch = useAppDispatch();

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	const openModal = () => {
		dispatch(setIngredient(ingredient));
		dispatch(setShowModal(true));
	};

	return (
		<>
			<div
				onClick={openModal}
				role={'button'}
				tabIndex={0}
				ref={dragRef}
				className={styles.cardWrapper}>
				<figure className={styles.card}>
					<img
						src={ingredient.image}
						alt={ingredient.name}
						className={'ml-4 mr-4 mb-1'}
					/>
					<figcaption
						className={clsx(
							'mb-1 text text_type_digits-default',
							styles.signature
						)}>
						{ingredient.price}
						<CurrencyIcon type='primary' />
					</figcaption>
					<figcaption
						className={clsx('text text_type_main-small', styles.signature)}>
						{ingredient.name}
					</figcaption>
				</figure>
			</div>
		</>
	);
};
