import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
		getBurgerData: build.query({
			query: () => {
				return {
					url: 'https://norma.nomoreparties.space/api/ingredients',
					method: 'GET',
				};
			},
			transformResponse: (response) => {
				return response;
			},
		}),
	}),
});

export const { useGetBurgerDataQuery } = burgerDataApi;
