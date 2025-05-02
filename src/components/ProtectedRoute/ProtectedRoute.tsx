import React from 'react';

import { useLocation, Navigate } from 'react-router-dom';
import { getCookie } from '@utils/cookies';

import type { FC, ReactNode } from 'react';

type TProtectedRoute = {
	children: ReactNode;
	forAuth?: boolean;
	path: string;
};

export const ProtectedRoute: FC<TProtectedRoute> = ({
	forAuth = false,
	children,
}) => {
	const user = null;
	const isAuthorized = getCookie('accessToken');
	const location = useLocation();

	console.log('forAuth', forAuth);
	console.log('isAuthorized', isAuthorized);
	console.log('user', user);

	if (!forAuth && isAuthorized) {
		console.log(1);
		const { from }: { from?: { pathname: string } } = location.state || {
			from: { pathname: '/' },
		};

		return <Navigate to={from?.pathname || '/'} replace />;
	}

	if (forAuth && !isAuthorized) {
		console.log(2);
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	console.log(3);
	return <>{children}</>;
};
