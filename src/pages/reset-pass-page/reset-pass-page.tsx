import React, { useState } from 'react';
import { clsx } from 'clsx';

import { useSendNewPasswordMutation } from '@store';
import { Link, useNavigate } from 'react-router-dom';
import {
	Logo,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { SyntheticEvent } from 'react';

import styles from './reset-pass-page.module.scss';

export const ResetPassPage = () => {
	const navigate = useNavigate();

	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');

	const [newPassRequest] = useSendNewPasswordMutation();

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		newPassRequest({ password: password, token: token })
			.unwrap()
			.then((res) => {
				alert('пароль успешно изменён');
				if (res.success) navigate('/login', { replace: true });
			})
			.catch((err) => {
				console.error(err.message);
			});
	};

	return (
		<article className={clsx(styles.loginWrapper, 'mt-25')}>
			<Logo />

			<form
				className={clsx(styles.loginInputs, 'mt-10')}
				onSubmit={handleSubmit}>
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

			<div className={clsx(styles.loginActions, 'mt-20')}>
				<span className='text text_type_main-default text_color_inactive'>
					Вспомнили пароль?
					<Link to='/login' className='text pl-2 text_type_main-default'>
						Войти
					</Link>
				</span>
			</div>
		</article>
	);
};
