import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '@store';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import type { SyntheticEvent } from 'react';

import styles from './profile-form.module.scss';

export const ProfileForm = () => {
	const dispatch = useAppDispatch();
	const initialState = {
		name: '',
		email: '',
		password: '',
	};
	const [defaultState, setDefaultState] = useState(initialState);
	const [state, setState] = useState(initialState);

	const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target;
		setState({
			...state,
			[target.name]: target.value,
		});
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// отправка данных на обновление
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setState(defaultState);
	};

	useEffect(() => {
		console.log(setDefaultState);
		// мб пригодится
	}, [dispatch]);

	return (
		<form className={styles.profileForm} onSubmit={handleSubmit}>
			<Input
				onChange={handleStateChange}
				value={state.name || ''}
				placeholder={'Имя'}
				icon={'EditIcon'}
				size={'default'}
				type={'text'}
				name={'name'}
			/>
			<Input
				onChange={handleStateChange}
				placeholder={'Email'}
				value={state.email}
				icon={'EditIcon'}
				type={'text'}
				name={'email'}
			/>
			<Input
				value={state.password || ''}
				onChange={handleStateChange}
				placeholder={'Пароль'}
				type={'password'}
				icon={'EditIcon'}
				name={'password'}
				size={'default'}
			/>
			<Button type='primary' size='small' htmlType='button'>
				<p className='text text_type_main-default'>Сохранить</p>
			</Button>
			<Button
				type='secondary'
				htmlType='button'
				size='small'
				onClick={handleReset}>
				<p className='text text_type_main-default'>Отмена</p>
			</Button>
		</form>
	);
};
