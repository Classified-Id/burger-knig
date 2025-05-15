import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSendLoginMutation } from '@store';

import type { FC, ChangeEvent, MouseEventHandler } from 'react';
import type { TLoginError } from '../../store/types/user.types';

import styles from './login-page.module.scss';
import { Notify } from '@components/notify/notify';

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const user = {
		name: undefined,
	};

	const [loginRequest, { error }] = useSendLoginMutation();

	const onSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		loginRequest({ password, email })
			.unwrap()
			.then(() => {
				navigate('/', { replace: true });
			})
			.catch((err) => {
				console.error(err.data.message);
			});
	};

	const register = () => navigate('/register', { replace: true });

	const forgotPassword = () => navigate('/forgot-password', { replace: true });

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	if (user.name) {
		return <Navigate to={location?.state?.from || '/'} />;
	}

	return (
		<section className={styles.loginPageContainer}>
			{(error as TLoginError) && (
				<Notify message={(error as TLoginError).data.message} />
			)}

			<form className={`${styles.loginForm} mb-20`} onSubmit={onSubmit}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<EmailInput
					onChange={handleEmail}
					placeholder={'E-mail'}
					value={email}
					name={'email'}
				/>
				<PasswordInput
					onChange={handlePassword}
					name={'password'}
					icon={'HideIcon'}
					value={password}
				/>
				<Button htmlType={'submit'} type={'primary'}>
					Войти
				</Button>
			</form>

			<div className={styles.actions}>
				<p className='text text_type_main-default text_color_inactive'>
					Хотите влиться?
				</p>
				<Button
					type={'secondary'}
					extraClass={styles.buttonLink}
					htmlType={'button'}
					onClick={register}>
					Зарегистрироваться
				</Button>
			</div>
			<div className={styles.actions}>
				<p className='text text_type_main-default text_color_inactive'>
					Забыли пароль?
				</p>
				<Button
					type={'secondary'}
					extraClass={styles.buttonLink}
					htmlType={'button'}
					onClick={forgotPassword}>
					Восстановить пароль
				</Button>
			</div>
		</section>
	);
};
