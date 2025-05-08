import React, { useState } from 'react';
import { clsx } from 'clsx';

import { Link } from 'react-router-dom';
import {
	Logo,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { SyntheticEvent } from 'react';

import styles from './reset-pass-page.module.scss';

export const ResetPassPage = () => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');

	const handleSubmit = (e: SyntheticEvent) => {
		console.log(e);
		//todo функция в ртк
	};

	return (
		<article className={clsx(styles.loginWrapper, 'mt-25')}>
			<Logo />

			<form className={styles.loginInputs} onSubmit={handleSubmit}>
				<h3 className='text text_type_main-medium'>Восстановление пароля</h3>
				<Input
					onChange={(event) => setPassword(event.target.value)}
					placeholder={'Введите новый пароль'}
					type={'password'}
					value={password}
				/>
				<Input
					onChange={(event) => setToken(event.target.value)}
					placeholder={'Введите код из письма'}
					type={'text'}
					value={token}
				/>

				<Button htmlType={'submit'} type='primary' size='small'>
					<p className='text text_type_main-default'>Сохранить</p>
				</Button>
			</form>

			<div className={styles.loginActions}>
				<span className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?
					<Link to='/register' className='text pl-2 text_type_main-default'>
						Войти
					</Link>
				</span>
			</div>
		</article>
	);
};
