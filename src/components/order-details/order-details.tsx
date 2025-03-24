import React from 'react';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-details.module.scss';

export const OrderDetails = () => {
	return (
		<section className={styles.productPortal}>
			<p className='text text_type_digits-large mt-8 mb-8'>034536</p>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<CheckMarkIcon type='primary' className={'mb-15'} />
			<p className='text text_type_main-small mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-small mb-30' style={{ color: 'gray' }}>
				Дождитесь готовности на орбитальной станции
			</p>
		</section>
	);
};
