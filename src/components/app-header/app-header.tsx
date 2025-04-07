import { clsx } from 'clsx';

import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.scss';

export const AppHeader = () => {
	return (
		<header className={styles.header}>
			<nav className={clsx(styles.headerNavigation)}>
				<a
					href={'/constructor'}
					className={clsx(styles.headerLink, 'p-5', 'mr-2')}>
					<BurgerIcon type='primary' />
					<span className='text text_type_main-default'>Конструктор</span>
				</a>

				<a href={'/orders'} className={clsx(styles.headerLink, 'p-5')}>
					<ListIcon type='secondary' />
					<span className='text text_type_main-default'>Лента заказов</span>
				</a>

				<a href={'/main page'} className={styles.headerLogo}>
					<Logo />
				</a>

				<a href={'/account'} className={clsx(styles.headerLink, 'p-5')}>
					<ProfileIcon type='secondary' />
					<span className='text text_type_main-default'>Личный кабинет</span>
				</a>
			</nav>
		</header>
	);
};
