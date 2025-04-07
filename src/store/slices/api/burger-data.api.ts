import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INGREDIENTS_URL, ORDER_URL } from '@constants';
import { setOrderData } from '@store';

import type {
	TIngredientsResponse,
	TTransformedResponse,
} from '../../types/ingredients.types';
import type { TOrder } from '../../types/order.types';

export const burgerDataApi = createApi({
	reducerPath: 'burgerDataApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
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
	}),
});

export const { useGetIngredientsQuery, useSendOrderMutation } = burgerDataApi;
