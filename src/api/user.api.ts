import { getCookie, setCookie } from '@utils/cookies';
import { request } from '@utils/request';

import type { ResponseAuthData } from '../store/types/user.types';

export const getToken = async () => {
	const token = getCookie('refresh');

	return await request('/auth/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({ token }),
	}).then((data: ResponseAuthData) => {
		const { accessToken, refreshToken } = data;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, token] = accessToken.split(' ');
		setCookie('token', token, {
			expires: 20 * 60,
		});
		setCookie('refresh', refreshToken);

		return data;
	});
};
