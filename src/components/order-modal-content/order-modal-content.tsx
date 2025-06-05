import { useAppSelector, useGetIngredientsQuery } from '@store';
import { OrderModalItem } from '@components/order-modal-item/order-modal-item';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { status } from '@constants';

import styles from './order-modal-content.module.scss';

export function OrderModalContent() {
	const { currentOrder } = useAppSelector((state) => state.orders);
	const { data } = useGetIngredientsQuery();

	const allIngredients = data
		? [...(data.buns || []), ...(data.mains || []), ...(data.sauces || [])]
		: [];

	if (currentOrder && allIngredients.length) {
		const ingredientCount = currentOrder.ingredients.reduce((acc, id) => {
			acc[id] = (acc[id] || 0) + 1;

			return acc;
		}, {} as { [id: string]: number });

		const ingredientsWithCount = Object.keys(ingredientCount).map((id) => ({
			id,
			count: ingredientCount[id],
		}));

		const totalPrice = Object.keys(ingredientCount).reduce((total, id) => {
			const ingredient = allIngredients.find(
				(ingredient) => ingredient._id === id
			);

			if (ingredient) {
				total += ingredient.price * ingredientCount[id];
			}

			return total;
		}, 0);

		return (
			<div className={styles.container}>
				<div className='pb-15'>
					<p className={`${styles.number} text text_type_digits-default pb-10`}>
						#{currentOrder.number}
					</p>
					<h1 className='text text_type_main-medium pb-3'>
						{currentOrder.name}
					</h1>
					<div
						className='text text_type_main-default'
						style={{
							color: currentOrder.status === 'done' ? '#00cccc' : '',
						}}>
						{status[currentOrder.status]}
					</div>
				</div>
				<div className={styles.content}>
					<h2 className='pb-6 text text_type_main-medium'>Состав:</h2>
					<ul className={`${styles.list} pr-8`}>
						{ingredientsWithCount.map((ingredient) => (
							<OrderModalItem key={ingredient.id} {...ingredient} />
						))}
					</ul>
				</div>
				<div className={`${styles.bottom} pt-10 mb-6`}>
					<FormattedDate
						className='text text_type_main-default text_color_inactive'
						date={new Date(currentOrder.createdAt)}
					/>
					<div className={styles.total}>
						<span className='text text_type_digits-default mr-2'>
							{totalPrice}
						</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		);
	}

	return <div>Загрузка...</div>;
}
