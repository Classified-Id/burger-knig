import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie } from '@utils/cookies';

import {
	BASE_URL,
	INGREDIENTS_URL,
	ORDER_URL,
	GET_RESET_CODE_URL,
	RESET_PASSWORD_URL,
	REGISTER_URL,
	LOGIN_URL,
	USER_URL,
} from '@constants';
import { setOrderData } from '@store';

import type {
	TIngredientsResponse,
	TTransformedResponse,
} from '../../types/ingredients.types';
import type {
	TOrder,
	TForgotAndNewPassResponse,
} from '../../types/order.types';

import type {
	TRegisterProps,
	TRegisterResponse,
	TLoginProps,
} from '../../types/user.types';

export const burgerDataApi = createApi({
	reducerPath: 'burgerDataApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
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
			invalidatesTags: ['User'],
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
					localStorage.setItem('refreshToken', data.refreshToken);

					setTimeout(() => {
						dispatch(burgerDataApi.util.invalidateTags(['User']));
					}, 100);
				} catch (error) {
					console.error('Login failed:', error);
				}
			},
		}),
		getUser: build.query<void, void>({
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
} = burgerDataApi;
