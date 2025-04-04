import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INGREDIENTS_URL } from '@constants';

import type {
	TIngredientsResponse,
	TTransformedResponse,
} from '../../types/ingredients.types';

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
	}),
});

export const { useGetIngredientsQuery } = burgerDataApi;
