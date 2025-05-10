import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useLogoutMutation } from '@store';

import styles from './profile-page.module.scss';

export function Nav() {
	const { pathname } = useLocation();

	const [logoutRequest] = useLogoutMutation();

	return (
		<nav className={styles.navigationList + ' pt-5 mb-20'}>
			<NavLink
				to='/profile'
				className={({ isActive }) =>
					`${styles.link} text text_type_main-medium text_color_inactive ${
						isActive ? styles.linkActive : ''
					}`
				}>
				<span className='ml-2 pu-5 pb-5'>Профиль</span>
			</NavLink>

			<NavLink
				to='/profile/orders'
				className={({ isActive }) =>
					`${styles.link} text text_type_main-medium text_color_inactive ${
						isActive ? styles.linkActive : ''
					}`
				}>
				<span className='ml-2 pu-5 pb-5'>История заказов</span>
			</NavLink>

			<NavLink
				to='/login'
				className={({ isActive }) =>
					`${styles.link} text text_type_main-medium text_color_inactive ${
						isActive ? styles.linkActive : ''
					}`
				}
				onClick={() => logoutRequest()}>
				<span className='ml-2 pu-5 pb-5'>Выход</span>
			</NavLink>

			<div className='pt-20'>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе Вы можете
				</p>
				{pathname === '/profile' && (
					<p className='text text_type_main-default text_color_inactive'>
						отредактировать свои персональные данные
					</p>
				)}
				{pathname === '/profile/orders' && (
					<p className='text text_type_main-default text_color_inactive'>
						просмотреть свою историю заказов
					</p>
				)}
			</div>
		</nav>
	);
}
