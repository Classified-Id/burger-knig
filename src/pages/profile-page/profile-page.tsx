import React from 'react';
import { Outlet } from 'react-router-dom';

import { Nav } from './nav';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
	return (
		<main className={styles.layout}>
			<Nav />
			<div className={`${styles.outlet} mt-8`}>
				<Outlet />
			</div>
		</main>
	);
};
