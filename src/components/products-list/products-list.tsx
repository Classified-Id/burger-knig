import { clsx } from 'clsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './products-list.module.scss';

import type { FC, ReactNode } from 'react';

interface ProductsListProps {
	children: ReactNode;
}

//todo создать компонент product

export const ProductsList: FC<ProductsListProps> = ({ children }) => {
	return (
		<>
			<h2 className={clsx(styles.title, 'text text_type_main-medium')}>
				{children}
			</h2>
			<div
				className={clsx(
					styles.ingredientsBox,
					'mt-6',
					'ml-4',
					'mr-4',
					'mb-10'
				)}>
				<a href='/test'>
					<figure className={styles.card}>
						<img
							src='https://main-cdn.sbermegamarket.ru/big1/hlr-system/-34/290/586/471/215/48/100028795448b0.jpg'
							alt='Описание изображения'
							className={'ml-4 mr-4 mb-1'}
						/>
						<figcaption
							style={{ display: 'flex', gap: '8px' }}
							className={'mb-1 text text_type_digits-default'}>
							20 <CurrencyIcon type='primary' />
						</figcaption>
						<figcaption
							style={{ height: '48px' }}
							className={'text text_type_main-small'}>
							Краторная булка N-200i
						</figcaption>
					</figure>
				</a>

				<a href='/test'>
					<figure className={styles.card}>
						<img
							src='https://main-cdn.sbermegamarket.ru/big1/hlr-system/-34/290/586/471/215/48/100028795448b0.jpg'
							alt='Описание изображения'
							className={'ml-4 mr-4 mb-1'}
						/>
						<figcaption
							style={{ display: 'flex', gap: '8px' }}
							className={'mb-1 text text_type_digits-default'}>
							20 <CurrencyIcon type='primary' />
						</figcaption>
						<figcaption
							style={{ height: '48px' }}
							className={'text text_type_main-small'}>
							Краторная булка N-200i
						</figcaption>
					</figure>
				</a>

				<a href='/test'>
					<figure className={styles.card}>
						<img
							src='https://main-cdn.sbermegamarket.ru/big1/hlr-system/-34/290/586/471/215/48/100028795448b0.jpg'
							alt='Описание изображения'
							className={'ml-4 mr-4 mb-1'}
						/>
						<figcaption
							style={{ display: 'flex', gap: '8px' }}
							className={'mb-1 text text_type_digits-default'}>
							20 <CurrencyIcon type='primary' />
						</figcaption>
						<figcaption
							style={{ height: '48px' }}
							className={'text text_type_main-small'}>
							Краторная булка N-200i
						</figcaption>
					</figure>
				</a>
			</div>
		</>
	);
};
