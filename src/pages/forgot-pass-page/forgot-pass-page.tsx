import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { FC, MouseEventHandler, ChangeEvent } from 'react';

import styles from './forgot-pass-page.module.scss';

export const ForgotPassPage: FC = () => {
	const navigate = useNavigate();
	const [valEmail, setValEmail] = useState('');

	const onSubmit: MouseEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		console.log(valEmail);

		//todo тут будет вызов запроса из рткшки и его обработка

		navigate('/reset-password', { replace: true });
	};

	const login = () => navigate('/login', { replace: true });

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setValEmail(e.target.value);
	};

	return (
		<article className={clsx('mt-40', styles.pageContainer)}>
			<form className={styles.forgotPassForm} onSubmit={onSubmit}>
				<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
				<EmailInput
					placeholder={'Укажите e-mail'}
					onChange={handleEmail}
					value={valEmail}
					name={'email'}
				/>
				<Button type={'primary'} htmlType={'submit'}>
					Восстановить
				</Button>
			</form>
			<div className={clsx('mt-20', styles.toLoginContainer)}>
				<p className='text text_color_inactive text_type_main-default'>
					Вспомнили пароль?
				</p>
				<Button
					extraClass={styles.homeLink}
					htmlType={'button'}
					type={'secondary'}
					onClick={login}>
					Войти
				</Button>
			</div>
		</article>
	);
};
