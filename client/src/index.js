import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as Sentry from '@sentry/browser';
import App from './components/App';

Sentry.init({ dsn: 'https://4a08088b68b94bcdae6f39ca6fa5a377@sentry.io/1452343' });

ReactDOM.render(
    <Root>
        <App />
    </Root>,
    document.querySelector('#root')
);
