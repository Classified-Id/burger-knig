import React, { useState, useEffect } from 'react';

import { useGetUserQuery, useUpdateUserMutation } from '@store';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { SyntheticEvent } from 'react';

import styles from './profile.module.scss';

export const Profile = () => {
	const { data: user, isSuccess } = useGetUserQuery();
	const [updateUserRequest] = useUpdateUserMutation();

	const initialState = {
		name: '',
		email: '',
		password: '',
	};

	const [formData, setFormData] = useState(initialState);
	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		if (isSuccess && user) {
			setFormData({
				name: user.user?.name || '',
				email: user.user?.email || '',
				password: '',
			});
		}
	}, [isSuccess, user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setIsDirty(true);
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!isDirty) return;

		updateUserRequest({
			name: formData.name,
			email: formData.email,
			password: formData.password,
		});
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		if (user) {
			setFormData({
				name: user.user?.name || '',
				email: user.user?.email || '',
				password: '',
			});
		}
		setIsDirty(false);
	};

	return (
		<div className={styles.profileWrapper + ' pt-20'}>
			<form className={styles.profileForm} onSubmit={handleSubmit}>
				<Input
					onChange={handleChange}
					value={formData.name}
					placeholder={'Имя'}
					icon={'EditIcon'}
					size={'default'}
					type={'text'}
					name={'name'}
				/>
				<Input
					onChange={handleChange}
					value={formData.email}
					placeholder={'Email'}
					icon={'EditIcon'}
					type={'email'}
					name={'email'}
				/>
				<Input
					onChange={handleChange}
					value={formData.password}
					placeholder={'Пароль'}
					type={'password'}
					icon={'EditIcon'}
					name={'password'}
					size={'default'}
				/>
				<Button type='primary' size='small' htmlType='submit'>
					<p className='text text_type_main-default'>Сохранить</p>
				</Button>
				<Button
					onClick={handleReset}
					htmlType='button'
					type='secondary'
					size='small'>
					<p className='text text_type_main-default'>Отмена</p>
				</Button>
			</form>
		</div>
	);
};
