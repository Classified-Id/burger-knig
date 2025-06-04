import { checkResponse } from '@utils/check-response';
import { BASE_URL } from '@constants';

export const request = (endpoint: string, options = {}) => {
	const url = `${BASE_URL}${endpoint}`;
	return fetch(url, options).then(checkResponse);
};
