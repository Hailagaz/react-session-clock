import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import clockReducer from './redux/clockSlice';
import './index.css';

// Corrected import for createRoot
import { createRoot } from 'react-dom/client';

const store = configureStore({
	reducer: {
		clock: clockReducer,
	},
});

const root = createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
