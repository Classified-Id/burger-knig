import { getCookie, setCookie } from '@utils/cookies';
import { BASE_URL } from '@constants';

import type { ResponseAuthData } from '../store/types/user.types';

export const refreshToken = async (): Promise<ResponseAuthData> => {
	const refreshToken = getCookie('refreshToken');
	if (!refreshToken) throw new Error('Refresh token not found');

	try {
		const response = await fetch(`${BASE_URL}/auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({ token: refreshToken }),
		});

		const data = await response.json();

		if (!response.ok) {
			console.error(`${data?.message} - ${response.status}`);
			throw new Error(data?.message || 'Не удалось обновить токен');
		}

		const accessToken = data.accessToken.split('Bearer ')[1];
		setCookie('accessToken', accessToken, { expires: 1200 });
		setCookie('refreshToken', data.refreshToken);

		return data;
	} catch (error) {
		console.error('Token refresh failed:', error);
		throw error instanceof Error ? error : new Error('Не удалось обновить токен');
	}
};
