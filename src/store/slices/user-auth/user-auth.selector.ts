import type { RootState } from '@store';

export const getEmailSubmitted = (state: RootState) =>
	state.authUserSlice.emailSubmitted;
