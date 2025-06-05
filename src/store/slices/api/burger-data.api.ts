import {
	createApi,
	fetchBaseQuery,
	BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie, deleteCookie } from '@utils/cookies';

import {
	BASE_URL,
	INGREDIENTS_URL,
	ORDER_URL,
	GET_RESET_CODE_URL,
	RESET_PASSWORD_URL,
	REGISTER_URL,
	LOGIN_URL,
	USER_URL,
	REFRESH_TOKEN_URL,
	LOGOUT_URL,
} from '@constants';
import { setOrderData, addOrder } from '@store';

import { setEmailSubmitted } from '../user-auth/user-auth.slice';

import type {
	TIngredientsResponse,
	TTransformedResponse,
} from '../../types/ingredients.types';
import type {
	TOrder,
	TForgotAndNewPassResponse,
	TGetOrderProps,
	TGetOrderResponse,
} from '../../types/order.types';

import type {
	TRegisterProps,
	TRegisterResponse,
	TLoginProps,
	TUser,
	TUpdateUserProps,
	TUpdateUserResponse,
	TLogoutResponse,
} from '../../types/user.types';

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		const token = getCookie('accessToken');
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseQueryWithReauth: BaseQueryFn = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions);

	if (
		result.error?.status === 403 &&
		!(args.url === '/auth/token' && args.method === 'POST')
	) {
		console.log(11, 11);
		const refreshToken = getCookie('refreshToken');

		console.log(refreshToken);
		if (refreshToken) {
			const refreshResult = await api.dispatch(
				burgerDataApi.endpoints.refreshToken.initiate({ token: refreshToken })
			);

			console.log(refreshResult);

			if ('data' in refreshResult && refreshResult.data) {
				const accessToken = refreshResult.data.accessToken.split('Bearer ')[1];
				setCookie('accessToken', accessToken);
				setCookie('refreshToken', refreshResult.data.refreshToken);

				result = await baseQuery(args, api, extraOptions);
			} else {
				localStorage.removeItem('refreshToken');
				setCookie('accessToken', '', { expires: -1 });
			}
		}
	}

	return result;
};

export const burgerDataApi = createApi({
	reducerPath: 'burgerDataApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: (build) => ({
		getIngredients: build.query<TTransformedResponse, void>({
			query: () => {
				return {
					url: INGREDIENTS_URL,
					method: 'GET',
				};
			},
			transformResponse: (response: TIngredientsResponse) => {
				const buns =
					response?.data?.filter((item) => item.type === 'bun') || [];
				const mains =
					response?.data?.filter((item) => item.type === 'main') || [];
				const sauces =
					response?.data?.filter((item) => item.type === 'sauce') || [];

				return {
					buns,
					mains,
					sauces,
				};
			},
		}),
		sendOrder: build.mutation<TOrder, string[]>({
			query: (orderArray: string[]) => ({
				url: ORDER_URL,
				method: 'POST',
				body: {
					ingredients: orderArray,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setOrderData(data));
				} catch (err) {
					console.error('Во время создания заказа возникла ошибка', err);
				}
			},
		}),
		sendEmailCode: build.mutation<TForgotAndNewPassResponse, string>({
			query: (email: string) => ({
				url: GET_RESET_CODE_URL,
				method: 'POST',
				body: {
					email: email,
				},
			}),
			async onQueryStarted(email, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setEmailSubmitted(true));
				} catch (error) {
					dispatch(setEmailSubmitted(false));
					console.error('Ошибка отправки кода:', error);
				}
			},
		}),
		sendNewPassword: build.mutation<
			TForgotAndNewPassResponse,
			{ password: string; token: string }
		>({
			query: ({ password, token }) => ({
				url: RESET_PASSWORD_URL,
				method: 'POST',
				body: {
					password: password,
					token: token,
				},
			}),
		}),
		sendRegister: build.mutation<TRegisterResponse, TRegisterProps>({
			query: ({ email, password, name }) => ({
				url: REGISTER_URL,
				method: 'POST',
				body: {
					email,
					password,
					name,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const accessToken = data.accessToken.split('Bearer ')[1];
					setCookie('accessToken', accessToken);
					setCookie('refreshToken', data.refreshToken);

					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 100);
				} catch (error) {
					console.error('Registration failed:', error);
				}
			},
		}),
		sendLogin: build.mutation<TRegisterResponse, TLoginProps>({
			query: ({ email, password }) => ({
				url: LOGIN_URL,
				method: 'POST',
				body: {
					email,
					password,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const accessToken = data.accessToken.split('Bearer ')[1];
					setCookie('accessToken', accessToken);
					setCookie('refreshToken', data.refreshToken);

					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 100);
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		getUser: build.query<TUser, void>({
			query: () => {
				return {
					url: USER_URL,
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				};
			},
			providesTags: ['User'],
		}),
		updateUser: build.mutation<TUpdateUserResponse, TUpdateUserProps>({
			query: ({ email, password, name }) => ({
				url: USER_URL,
				method: 'PATCH',
				body: {
					name,
					email,
					password,
				},
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}),
			async onQueryStarted(arg, { dispatch }) {
				try {
					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 100);
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		refreshToken: build.mutation<
			{
				success: boolean;
				accessToken: string;
				refreshToken: string;
			},
			{ token: string }
		>({
			query: ({ token }) => ({
				url: REFRESH_TOKEN_URL,
				method: 'POST',
				body: { token },
				headers: {
					Authorization: `Bearer ${getCookie('refreshToken')}`,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const accessToken = data.accessToken.split('Bearer ')[1];
					setCookie('accessToken', accessToken);
					setCookie('refreshToken', data.refreshToken);

					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 100);
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		logout: build.mutation<TLogoutResponse, void>({
			query: () => ({
				url: LOGOUT_URL,
				method: 'POST',
				body: {
					token: getCookie('refreshToken'),
				},
				headers: {
					Authorization: `Bearer ${getCookie('refreshToken')}`,
				},
			}),
			async onQueryStarted(arg, { dispatch }) {
				try {
					deleteCookie('accessToken');
					deleteCookie('refreshToken');

					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 200);
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		getOrderById: build.query<TGetOrderResponse, TGetOrderProps>({
			query: ({ orderId }) => {
				return {
					url: `/orders/${orderId}`,
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(addOrder(data.orders[0]));
				} catch (error) {
					console.error('Ошибка при получении заказа:', error);
				}
			},
		}),
	}),
});

export const {
	useGetIngredientsQuery,
	useSendOrderMutation,
	useSendEmailCodeMutation,
	useSendNewPasswordMutation,
	useSendRegisterMutation,
	useSendLoginMutation,
	useGetUserQuery,
	useUpdateUserMutation,
	useRefreshTokenMutation,
	useLogoutMutation,
	useLazyGetOrderByIdQuery,
} = burgerDataApi;
