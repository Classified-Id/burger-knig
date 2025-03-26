import { clsx } from 'clsx';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '@components/modal';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { useModal } from '@hooks/useModal';

import styles from './product.module.scss';

import type { FC } from 'react';
import type { TIngredient } from '@store';

type ProductType = {
	data: TIngredient;
};

export const Product: FC<ProductType> = ({ data }) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<>
			<div
				onClick={openModal}
				role={'button'}
				tabIndex={0}
				className={styles.cardWrapper}>
				<figure className={styles.card}>
					<img src={data.image} alt={data.name} className={'ml-4 mr-4 mb-1'} />
					<figcaption
						className={clsx(
							'mb-1 text text_type_digits-default',
							styles.signature
						)}>
						{data.price}
						<CurrencyIcon type='primary' />
					</figcaption>
					<figcaption
						className={clsx('text text_type_main-small', styles.signature)}>
						{data.name}
					</figcaption>
				</figure>
			</div>

			{isModalOpen && (
				<Modal onClose={closeModal} header={'Детали ингредиента'}>
					<IngredientDetails ingredient={data} />
				</Modal>
			)}
		</>
	);
};
