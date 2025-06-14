import { describe, expect, it } from '@jest/globals';
import reducer, {
	initialState,
	setEmailSubmitted,
	toggleEmailSubmitted,
} from './user-auth.slice';

describe('authUserSlice', () => {
	describe('initial state', () => {
		it('should return initial state', () => {
			expect(reducer(undefined, { type: '' })).toEqual(initialState);
		});
	});

	describe('toggleEmailSubmitted', () => {
		it('should toggle emailSubmitted from false to true', () => {
			const state = reducer(initialState, toggleEmailSubmitted());
			expect(state.emailSubmitted).toBe(true);
		});

		it('should toggle emailSubmitted from true to false', () => {
			const stateWithTrue = { ...initialState, emailSubmitted: true };
			const state = reducer(stateWithTrue, toggleEmailSubmitted());
			expect(state.emailSubmitted).toBe(false);
		});

		it('should not modify other state properties', () => {
			const state = reducer(initialState, toggleEmailSubmitted());

			expect(Object.keys(state)).toEqual(Object.keys(initialState));
			expect(state).toEqual({
				...initialState,
				emailSubmitted: true,
			});
		});
	});

	describe('setEmailSubmitted', () => {
		it('should set emailSubmitted to true', () => {
			const action = setEmailSubmitted(true);
			const state = reducer(initialState, action);
			expect(state.emailSubmitted).toBe(true);
		});

		it('should set emailSubmitted to false', () => {
			const stateWithTrue = { ...initialState, emailSubmitted: true };
			const action = setEmailSubmitted(false);
			const state = reducer(stateWithTrue, action);
			expect(state.emailSubmitted).toBe(false);
		});

		it('should handle multiple consecutive toggles', () => {
			let state = initialState;
			state = reducer(state, setEmailSubmitted(true));
			expect(state.emailSubmitted).toBe(true);

			state = reducer(state, setEmailSubmitted(false));
			expect(state.emailSubmitted).toBe(false);

			state = reducer(state, setEmailSubmitted(true));
			expect(state.emailSubmitted).toBe(true);
		});

		it('should not modify state when setting same value', () => {
			const stateWithTrue = { ...initialState, emailSubmitted: true };
			const action = setEmailSubmitted(true);
			const state = reducer(stateWithTrue, action);
			expect(state).toBe(stateWithTrue);
		});
	});
});
