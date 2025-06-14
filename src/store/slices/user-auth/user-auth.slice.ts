import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type TBurgerSliceInitState = {
	emailSubmitted: boolean;
};

export const initialState: TBurgerSliceInitState = {
	emailSubmitted: false,
};

export const authUserSlice = createSlice({
	name: 'userAuth',
	initialState,
	reducers: {
		toggleEmailSubmitted: (state) => {
			state.emailSubmitted = !state.emailSubmitted;
		},

		setEmailSubmitted: (state, action: PayloadAction<boolean>) => {
			state.emailSubmitted = action.payload;
		},
	},
});

export const { toggleEmailSubmitted, setEmailSubmitted } =
	authUserSlice.actions;

export default authUserSlice.reducer;
