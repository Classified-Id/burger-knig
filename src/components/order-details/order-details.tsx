import React from 'react';
import { clsx } from 'clsx';

import { getOrder, useAppSelector } from '@store';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-details.module.scss';

export const OrderDetails = () => {
	const order = useAppSelector(getOrder);

	return (
		<section className={styles.productPortal}>
			<p className='text text_type_digits-large mt-8 mb-8'>
				{order.order.number}
			</p>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<CheckMarkIcon type='primary' className={'mb-15'} />
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className={clsx('text text_type_main-small mb-30', styles.secondText)}>
				Дождитесь готовности на орбитальной станции
			</p>
		</section>
	);
};
