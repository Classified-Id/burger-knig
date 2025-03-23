import { useState } from 'react';
import { clsx } from 'clsx';

import {
	useAppSelector,
	getBurgerData,
	useGetBurgerDataQuery,
} from '@store/index';
import { add } from '@utils/one';
import { AppHeader } from '@components/app-header/app-header';

import s from './app.module.scss';

import reactLogo from '../../images/react.svg';
import { ReactComponent as TypescriptLogo } from '../../images/typescript.svg';

export const App = () => {
	const { data } = useGetBurgerDataQuery(null);
	const burgerData = useAppSelector(getBurgerData);

	const [count, setCount] = useState(0);

	console.log('data', data);

	return (
		<div className='page'>
			<AppHeader />
			<p>burgerData: {burgerData}</p>
			<div className='logo-wrapper'>
				<a href='https://reactjs.org' target='_blank' rel='noreferrer'>
					<img
						src={reactLogo}
						className={clsx(s.logo, s.react)}
						alt={`React logo ${add(2, 5)}`}
					/>
				</a>
				<a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
					<TypescriptLogo className={s.logo} />
				</a>
			</div>
			<h1>React + TS</h1>
			<div className={s.card}>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
			<div>123123</div>
		</div>
	);
};
