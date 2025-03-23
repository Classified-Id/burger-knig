import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.scss';

export const BurgerConstructor = () => {
	const handle = () => {
		console.log(1);
	};

	return (
		<section
			className={'pt-25'}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				width: '600px',
			}}>
			<ul style={{ display: 'flex', listStyle: 'none' }}>
				<li style={{ display: 'flex' }}>
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

			<div style={{ textAlign: 'right' }}>
				<span className='text text_type_digits-medium'>610</span>
				<CurrencyIcon type='primary' className={'mr-10'} />
				<Button htmlType='button' type='primary' size='medium' onClick={handle}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};
