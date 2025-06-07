import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { WSS_USER_URL_ORDERS } from '@constants';
import { useAppDispatch, connect, disconnect } from '@store';
import { Nav } from './nav';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(connect(WSS_USER_URL_ORDERS));
		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	return (
		<main className={styles.layout}>
			<Nav />
			<div className={`${styles.outlet} mt-8`}>
				<Outlet />
			</div>
		</main>
	);
};
