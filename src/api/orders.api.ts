import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '@utils/cookies';
import { request } from '@utils/request';

type RequestData = {
	ingredients: string[];
};

type ResponseData = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export const postOrder = createAsyncThunk<ResponseData, RequestData>(
	'order/post',
	async (data: RequestData) => {
		return await request('/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${getCookie('token')}`,
			},
			body: JSON.stringify(data),
		});
	}
);
