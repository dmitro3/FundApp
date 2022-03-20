import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./store";
import {Provider} from "react-redux";
import { NotificationsProvider } from '@mantine/notifications';

ReactDOM.render(
    <Provider store={store}>
        <NotificationsProvider>
            <App/>
        </NotificationsProvider>
    </Provider>,
    document.getElementById('root')
);
