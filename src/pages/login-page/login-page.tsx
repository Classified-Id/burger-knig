import React, { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

// import { useAppDispatch } from '@store';
import {
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { FC, ChangeEvent, MouseEventHandler } from 'react';

import styles from './login-page.module.scss';

export const LoginPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// const dispatch = useAppDispatch();
	const [valPass, setValPass] = useState('');
	const [valEmail, setValEmail] = useState('');

	//todo добавить получение юзера из стора или из хука ртк
	// const { user } = useSelector((store) => store.userInfo);
	const user = {
		name: undefined,
	};

	const onSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		//todo запрос на попытку входа

		navigate('/', { replace: true });
	};

	const register = () => navigate('/register', { replace: true });

	const forgotPassword = () => navigate('/forgot-password', { replace: true });

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setValEmail(e.target.value);
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setValPass(e.target.value);
	};

	if (user.name) {
		return <Navigate to={location?.state?.from || '/'} />;
	}

	return (
		<section className={styles.loginPageContainer}>
			<form className={`${styles.loginForm} mb-20`} onSubmit={onSubmit}>
				<h1 className='text text_type_main-medium'>Вход</h1>
				<EmailInput
					onChange={handleEmail}
					placeholder={'E-mail'}
					value={valEmail}
					name={'email'}
				/>
				<PasswordInput
					onChange={handlePassword}
					name={'password'}
					icon={'HideIcon'}
					value={valPass}
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
