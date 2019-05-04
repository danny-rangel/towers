import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import * as Sentry from '@sentry/browser';

import App from './components/App';
import reducers from './reducers';

Sentry.init({ dsn: 'https://4a08088b68b94bcdae6f39ca6fa5a377@sentry.io/1452343' });

Sentry.captureException(new Error("This is my fake error message"));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
