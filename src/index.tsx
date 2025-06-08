import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@store';

import { App } from '@components/app/app';

import './styles.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<Provider store={store}>
		<Router basename='/'>
			<App />
		</Router>
	</Provider>
);

//todo delete profile-form
