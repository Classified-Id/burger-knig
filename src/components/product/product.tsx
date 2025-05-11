import { clsx } from 'clsx';
import { useDrag } from 'react-dnd';
import { useNavigate, useLocation } from 'react-router-dom';

import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import {
	useAppDispatch,
	setShowModal,
	// setIngredient,
	useAppSelector,
	getBurgerBuns,
	getBurgerIngredients,
} from '@store';

import styles from './product.module.scss';

import type { FC } from 'react';
import type { ProductType } from './product.props';

export const Product: FC<ProductType> = ({ ingredient }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const buns = useAppSelector(getBurgerBuns);
	const burgerIngredients = useAppSelector(getBurgerIngredients);

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	const openModal = () => {
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});

		// dispatch(setIngredient(ingredient));
		dispatch(setShowModal(true));
	};

	const setCounter = () => {
		if (ingredient.type !== 'bun') {
			return (
				burgerIngredients &&
				burgerIngredients.reduce(
					(acc, item) => acc + +(item._id === ingredient._id),
					0
				)
			);
		} else if (buns?._id === ingredient._id) {
			return 2;
		} else return 0;
	};

	const counter = setCounter();

	return (
		<>
			<div
				onClick={openModal}
				role={'button'}
				tabIndex={0}
				ref={dragRef}
				className={styles.cardWrapper}>
				<figure className={styles.card}>
					{counter > 0 ? (
						<Counter size={'default'} count={setCounter()} />
					) : null}
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
