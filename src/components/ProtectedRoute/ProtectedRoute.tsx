import React from 'react';

import { Route, useLocation, Navigate } from 'react-router-dom';
import { getCookie } from '@utils/cookies';

import type { FC, ReactNode } from 'react';

type TProtectedRoute = {
	children: ReactNode;
	forAuth: boolean;
	exact: boolean;
	path: string;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
	forAuth,
	children,
	...rest
}) => {
	const isAuthorized = getCookie('accessToken');
	const location = useLocation();

	if (!forAuth && isAuthorized) {
		const { from }: { from?: { pathname: string } } = location.state || {
			from: { pathname: '/' },
		};

		return (
			<Route {...rest}>
				<Navigate to={from || ''} />
			</Route>
		);
	}

	if (forAuth && !isAuthorized) {
		return (
			<Route {...rest}>
				<Navigate to='/login' replace state={{ from: location }} />
			</Route>
		);
	}

	return <Route {...rest}>{children}</Route>;
};
