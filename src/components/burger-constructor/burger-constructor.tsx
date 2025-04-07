import { useMemo } from 'react';
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
	deleteBurgerIngredient,
} from '@store';

import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

import type { TIngredient } from '@store';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();
	const buns = useAppSelector(getBurgerBuns);
	const burgerIngredients = useAppSelector(getBurgerIngredients);

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

	const openModal = () => dispatch(setShowOrderModal(true));
	const elements = burgerIngredients.map((item, index) => {
		return (
			<li className={styles.listElement} key={item.idKey}>
				<DragIcon type={'primary'} />
				<ConstructorElement
					isLocked={false}
					text={item.name}
					price={item.price}
					thumbnail={item.image}
					handleClose={() => dispatch(deleteBurgerIngredient(index))}
				/>
			</li>
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

			<ul className={styles.list}>{elements}</ul>

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
						onClick={openModal}>
						Оформить заказ
					</Button>
				)}
			</div>
		</section>
	);
};
