import { clsx } from 'clsx';

import { Modal } from '@components/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useModal } from '@hooks/useModal';

import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

export const BurgerConstructor = () => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<section className={clsx('pt-25', styles.burgerConstructor)}>
			<ul className={styles.list}>
				<li className={styles.listElement}>
					{' '}
					<Button
						className={styles.dropButton}
						htmlType='button'
						type='secondary'
						size='small'>
						<DragIcon type={'primary'} />
					</Button>
					<ConstructorElement
						type='top'
						isLocked={true}
						text='Краторная булка N-200i (верх)'
						price={200}
						thumbnail={
							'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-34/290/586/471/215/48/100028795448b0.jpg'
						}
					/>
				</li>
			</ul>

			<div className={styles.placeAnOrder}>
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

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</section>
	);
};
