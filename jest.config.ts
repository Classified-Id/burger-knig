export default {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'^@store/(.*)$': '<rootDir>/src/store/$1',
		'^@constants/(.*)$': '<rootDir>/src/constants/$1',
		'^@types/(.*)$': '<rootDir>/src/types/$1',
	},
	globals: {
		fetch: global.fetch,
	},
};
