import { useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import { useDrop } from 'react-dnd';

import {
	useAppDispatch,
	useAppSelector,
	setShowOrderModal,
	getBurgerIngredients,
	getBurgerBuns,
	setBurgerBuns,
	addBurgerIngredient,
	sortBurgerIngredients,
	useSendOrderMutation,
} from '@store';

import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerItem } from '@components/burger-item/burger-item';

import styles from './burger-constructor.module.scss';

import type { TIngredient } from '@store';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const buns = useAppSelector(getBurgerBuns);
	const burgerIngredients = useAppSelector(getBurgerIngredients);

	const [sendOrder] = useSendOrderMutation();
	const price = useMemo(() => {
		return (
			burgerIngredients.reduce((acc, ingr) => acc + ingr.price, 0) +
			(buns?.price || 0) * 2
		);
	}, [burgerIngredients, buns]);

	const [{ isOver }, dropRef] = useDrop({
		accept: 'ingredient',
		drop(item: TIngredient) {
			if (item.type === 'bun') {
				dispatch(setBurgerBuns(item));
			} else {
				dispatch(addBurgerIngredient(item));
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const handleOrder = () => {
		if (buns !== null) {
			sendOrder([
				buns._id,
				...burgerIngredients.map((ing) => ing._id),
				buns._id,
			])
				.unwrap()
				.then(() => {
					dispatch(setShowOrderModal(true));
				});
		}
	};

	const handleMoveIngredient = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			dispatch(sortBurgerIngredients({ dragIndex, hoverIndex }));
		},
		[burgerIngredients, dispatch]
	);

	const ingredientsList = burgerIngredients.map((ing: TIngredient, index) => {
		return (
			<BurgerItem
				ingredient={ing}
				handleMove={handleMoveIngredient}
				index={index}
				key={ing.idKey}
			/>
		);
	});

	return (
		<section
			ref={dropRef}
			className={clsx('pt-25', styles.burgerConstructor, {
				[styles.dropBorder]: isOver,
			})}>
			{buns && (
				<ConstructorElement
					type='top'
					isLocked={true}
					extraClass={styles.buns}
					text={buns.name}
					price={buns.price}
					thumbnail={buns.image}
				/>
			)}

			<ul className={styles.list}>{ingredientsList}</ul>

			{buns && (
				<ConstructorElement
					type='bottom'
					isLocked={true}
					extraClass={styles.buns}
					text={buns.name}
					price={buns.price}
					thumbnail={buns.image}
				/>
			)}

			<div className={clsx(styles.placeAnOrder, 'mt-10')}>
				<span className='text text_type_digits-medium'>{price}</span>
				<CurrencyIcon type='primary' className={'mr-10'} />
				{price > 0 && (
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						onClick={handleOrder}>
						Оформить заказ
					</Button>
				)}
			</div>
		</section>
	);
};
