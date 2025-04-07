import { clsx } from 'clsx';

import { setShowOrderModal, useAppDispatch } from '@store';

import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

export const BurgerConstructor = () => {
	const dispatch = useAppDispatch();

	const openModal = () => dispatch(setShowOrderModal(true));

	return (
		<section className={clsx('pt-25', styles.burgerConstructor)}>
			<ConstructorElement
				type='top'
				isLocked={true}
				extraClass={styles.buns}
				text='Краторная булка N-200i (верх)'
				price={200}
				thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
			/>
			<ul className={styles.list}>
				<li className={styles.listElement}>
					<DragIcon type={'primary'} />
					<ConstructorElement
						isLocked={false}
						text='Соус Spicy-X'
						price={90}
						thumbnail={'https://code.s3.yandex.net/react/code/sauce-02.png'}
					/>
				</li>
				<li className={styles.listElement}>
					<DragIcon type={'primary'} />
					<ConstructorElement
						isLocked={false}
						text='Соус фирменный Space Sauce'
						price={80}
						thumbnail={'https://code.s3.yandex.net/react/code/sauce-04.png'}
					/>
				</li>
				<li className={styles.listElement}>
					<DragIcon type={'primary'} />
					<ConstructorElement
						isLocked={false}
						text='Биокотлета из марсианской Магнолии'
						price={424}
						thumbnail={'https://code.s3.yandex.net/react/code/meat-01.png'}
					/>
				</li>
				<li className={styles.listElement}>
					<DragIcon type={'primary'} />
					<ConstructorElement
						isLocked={false}
						text='Говяжий метеорит (отбивная)'
						price={3000}
						thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
					/>
				</li>
				<li className={styles.listElement}>
					<DragIcon type={'primary'} />
					<ConstructorElement
						isLocked={false}
						text='Мини-салат Экзо-Плантаго'
						price={4400}
						thumbnail={'https://code.s3.yandex.net/react/code/salad.png'}
					/>
				</li>
			</ul>
			<ConstructorElement
				type='bottom'
				isLocked={true}
				extraClass={styles.buns}
				text='Краторная булка N-200i (низ)'
				price={200}
				thumbnail={'https://code.s3.yandex.net/react/code/bun-01.png'}
			/>

			<div className={clsx(styles.placeAnOrder, 'mt-10')}>
				<span className='text text_type_digits-medium'>610</span>
				<CurrencyIcon type='primary' className={'mr-10'} />
				<Button
					htmlType='button'
					type='primary'
					size='medium'
					onClick={openModal}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};
