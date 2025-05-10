import React, { useState } from 'react';
import { clsx } from 'clsx';

import { useSendNewPasswordMutation } from '@store';
import { Link, useNavigate } from 'react-router-dom';
import {
	Logo,
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Notify } from '@components/notify/notify';

import type { SyntheticEvent } from 'react';
import type { TNewPasswordError } from '../../store/types/user.types';

import styles from './reset-pass-page.module.scss';

export const ResetPassPage = () => {
	const navigate = useNavigate();

	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');

	const [sendNewPassword, { error }] = useSendNewPasswordMutation();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();

		sendNewPassword({ password, token })
			.unwrap()
			.then((res) => {
				alert('Пароль успешно изменён');
				if (res.success) navigate('/login', { replace: true });
			})
			.catch((err: TNewPasswordError) => console.error(err.data.message));
	};

	return (
		<article className={clsx(styles.loginWrapper, 'mt-25')}>
			{(error as TNewPasswordError) && (
				<Notify message={(error as TNewPasswordError).data.message} />
			)}

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

				<Button
					htmlType={'submit'}
					type='primary'
					size='small'
					disabled={!password || !token}>
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
