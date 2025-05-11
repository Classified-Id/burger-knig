import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './ingredient-page.module.scss';

export const IngredientPage = () => {
	console.log(styles);

	return (
		<div>
			<header>header</header>
			<Outlet />
			<footer>header</footer>
		</div>
	);
};
