import { useNavigate, useLocation } from 'react-router';
import { useGetIngredientsQuery } from '@store';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { status } from '@constants';

import styles from './orders-list-item.module.scss';

import type { CSSProperties, FC } from 'react';
import type { ListOrdersItemProps } from './order-list-item.props';

export const OrderListItem: FC<ListOrdersItemProps> = (props) => {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		ingredients: ingredientsProp,
		_id,
		number,
		createdAt,
		name,
		hasStatus,
		status: statusProp,
	} = props;

	const { data, isLoading, error: isError } = useGetIngredientsQuery();

	const handleOpenModal = () => {
		navigate(_id, {
			state: { background: location },
		});
		// открыть модалку
	};

	const allIngredients = data
		? [...(data.buns || []), ...(data.mains || []), ...(data.sauces || [])]
		: [];

	const ingredients = ingredientsProp
		.map((ingredientId) =>
			allIngredients.find((item) => item._id === ingredientId)
		)
		.filter(
			(ingredient): ingredient is NonNullable<typeof ingredient> =>
				ingredient != null
		);

	const total = ingredients.reduce((sum, { price }) => sum + price, 0);

	const ListOrdersBadge = ({
		background,
		text,
		style,
	}: {
		style?: CSSProperties;
		background: string;
		text?: string;
	}) => (
		<span className={styles.badge} style={style}>
			<span
				className={styles.background}
				style={text ? { background, opacity: 0.6 } : { background }}></span>
			{text && (
				<span className={`text text_type_main-default ${styles.extra}`}>
					{text}
				</span>
			)}
		</span>
	);

	return (
		<button className={`${styles.item}`} onClick={handleOpenModal}>
			<div className={`${styles.header} pb-6`}>
				<p className='text text_type_digits-default'>{`#${number}`}</p>
				<FormattedDate
					className='text text_type_main-default text_color_inactive'
					date={new Date(createdAt)}
				/>
			</div>
			<h3 className='text text_type_main-medium'>{name}</h3>
			{hasStatus && (
				<div className='pb-6'>
					<p
						className='text text_type_main-default pt-2'
						style={statusProp === 'done' ? { color: '#00CCCC' } : undefined}>
						{status[statusProp]}
					</p>
				</div>
			)}
			<div className={styles.bot}>
				{isLoading ? (
					<p>Загрузка...</p>
				) : isError ? (
					<p className='text text_type_main-default text_color_error'>
						Ошибка получения данных
					</p>
				) : (
					<>
						<div className={`${styles.badges}`}>
							{ingredients.slice(0, 6).map((ingredient, i) => {
								return (
									<ListOrdersBadge
										key={i}
										text={
											i === 5 && ingredients.length > 6
												? `+${ingredients.length - 6}`
												: undefined
										}
										background={`center / cover no-repeat url("${ingredient.image_mobile}"), #131316`}
										style={{
											left: `-${16 * i}px`,
											zIndex: -i,
										}}
									/>
								);
							})}
						</div>
						<p className={`${styles.price} text text_type_digits-default`}>
							{total}
							<CurrencyIcon type='primary' />
						</p>
					</>
				)}
			</div>
		</button>
	);
};
