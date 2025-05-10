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
	const isAuthorized = getCookie('accessToken');
	const location = useLocation();

	if (!forAuth && isAuthorized) {
		const { from }: { from?: { pathname: string } } = location.state || {
			from: { pathname: '/' },
		};

		return <Navigate to={from?.pathname || '/'} replace />;
	}

	if (forAuth && !isAuthorized) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return <>{children}</>;
};
