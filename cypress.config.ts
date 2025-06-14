import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		setupNodeEvents(on, config) {},
		specPattern: 'cypress/integration/**/*.{js,ts}',
		supportFile: 'cypress/support/e2e.ts'
	},
	video: false,
	viewportWidth: 1280,
	viewportHeight: 800
});
