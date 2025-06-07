import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.scss';

export const AppHeader = () => {
	const { pathname } = useLocation();

	return (
		<header className={styles.header}>
			<nav className={clsx(styles.headerNavigation)}>
				<NavLink to='/' className={clsx(styles.headerLink, 'p-5', 'mr-2')}>
					<BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
					<span className='text text_type_main-default'>Конструктор</span>
				</NavLink>

				<NavLink to='/feed' className={clsx(styles.headerLink, 'p-5')}>
					<ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
					<span className='text text_type_main-default'>Лента заказов</span>
				</NavLink>

				<NavLink to='/' className={styles.headerLogo}>
					<Logo />
				</NavLink>

				<NavLink to='/profile' className={clsx(styles.headerLink, 'p-5')}>
					<ProfileIcon
						type={pathname.startsWith('/profile') ? 'primary' : 'secondary'}
					/>
					<span className='text text_type_main-default'>Личный кабинет</span>
				</NavLink>
			</nav>
		</header>
	);
};
