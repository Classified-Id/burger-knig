import { combineReducers } from '@reduxjs/toolkit';

import { burgerDataApi } from './api/burger-data.api';
import { burgerSlice } from './burgerStore/burger.slice';

export const rootReducer = combineReducers({
	burgerSlice: burgerSlice.reducer,
	[burgerDataApi.reducerPath]: burgerDataApi.reducer,
});
