import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import {
	Logo,
	Input,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { SyntheticEvent } from 'react';

import styles from './register-page.module.scss';

export const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// Выполняем запрос на регистрацию
	};

	return (
		<>
			<div className={clsx(styles.registerWrapper, 'mt-25')}>
				<Logo />

				<form
					className={clsx(styles.registerForm, 'mt-10')}
					onSubmit={handleSubmit}>
					<h3 className='text text_type_main-medium'>Регистрация</h3>
					<Input
						onChange={fieldChange}
						value={formData.name}
						placeholder={'Имя'}
						name={'name'}
						type={'text'}
					/>
					<Input
						onChange={fieldChange}
						value={formData.email}
						placeholder={'E-mail'}
						name={'email'}
						type={'email'}
					/>
					<PasswordInput
						onChange={fieldChange}
						value={formData.password}
						placeholder={'password'}
						name={'password'}
					/>
					<Button htmlType={'button'} type={'primary'} size={'small'}>
						<p className={'text text_type_main-default'}>Зарегистрироваться</p>
					</Button>
				</form>
			</div>

			<div className={clsx(styles.toLogin, 'mt-25')}>
				<span className={'text text_type_main-default text_color_inactive'}>
					Уже зарегистрированы?
					<Link to={'/login'} className={'text text_type_main-default pl-2'}>
						Войти
					</Link>
				</span>
			</div>
		</>
	);
};
