import type { RootState } from '../..';

export const getBurgerData = (state: RootState) => state.burgerSlice.burgerData;
