
import reportWebVitals from './reportWebVitals';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import config from '@/config';
import '@/styles/index.scss';
import {Provider} from "react";
import configureAppStore from "@/store/store";

void (async () => {
    const store = configureAppStore();

    ReactDOM.render(
        <App store={store} />,
        document.getElementById('root'));
})();
