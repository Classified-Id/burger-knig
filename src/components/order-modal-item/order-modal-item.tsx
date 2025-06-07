import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useGetIngredientsQuery } from '@store';

import styles from './order-modal-item.module.scss';

export function OrderModalItem({ id, count }: { id: string; count: number }) {
	const { data, isLoading, isError } = useGetIngredientsQuery();

	if (isLoading && isError) return null;

	const allIngredients = data
		? [...(data.buns || []), ...(data.mains || []), ...(data.sauces || [])]
		: [];

	const currentIngredient = allIngredients.find((item) => item._id === id);

	return currentIngredient ? (
		<li className={styles.item}>
			<span className={styles.badge}>
				<span
					className={styles.background}
					style={{
						background: `center / cover no-repeat url("${currentIngredient.image_mobile}"), #131316`,
					}}></span>
			</span>
			<p className='text text_type_main-default ml-4'>
				{currentIngredient.name}
			</p>
			<div className={styles.total}>
				<span className='text text_type_digits-default mr-2'>
					{`${count} x ${currentIngredient.price}`}
				</span>
				<CurrencyIcon type='primary' />
			</div>
		</li>
	) : null;
}
