import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

import { useSendRegisterMutation } from '@store';
import {
	Logo,
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Notify } from '@components/notify/notify';

import type { SyntheticEvent } from 'react';
import type { TRegisterError } from '../../store/types/user.types';

import styles from './register-page.module.scss';

export const RegisterPage = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [sendRegister, { isSuccess, error }] = useSendRegisterMutation();

	const fieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		sendRegister(formData);
	};

	useEffect(() => {
		if (isSuccess) navigate('/login', { replace: true });
	}, [isSuccess, navigate]);

	return (
		<>
			<div className={clsx(styles.registerWrapper, 'mt-25')}>
				{(error as TRegisterError) && (
					<Notify message={(error as TRegisterError).data.message} />
				)}
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
					<EmailInput
						onChange={fieldChange}
						value={formData.email}
						placeholder={'E-mail'}
						name={'email'}
					/>
					<PasswordInput
						onChange={fieldChange}
						value={formData.password}
						placeholder={'password'}
						name={'password'}
					/>
					<Button htmlType={'submit'} type={'primary'} size={'small'}>
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
