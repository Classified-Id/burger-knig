import React, { FC } from 'react';
// import { Link } from 'react-router-dom';

// import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './error-page.module.scss';

export const ErrorPage: FC = () => {
	return (
		<section className={styles.wrapper}>
			<h1 className={styles.header}>404</h1>
			<p className={`text text_type_digits-default ${styles.messageText}`}>
				Что-то пошло не так, страница не найдена по любой из причин, вернитесь
				назад и попробуйте ещё раз.
			</p>

			{/*<Link className={styles.homeLink} to='/'>*/}
			{/*	<Button type={'primary'} htmlType={'button'} size={'large'}>*/}
			{/*		На главную*/}
			{/*	</Button>*/}
			{/*</Link>*/}
		</section>
	);
};
