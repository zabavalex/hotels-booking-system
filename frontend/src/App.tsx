import 'antd/dist/antd.min.css';
import React, {useCallback} from 'react';
import cn from "clsx";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import styles from './components/pages/LoginPage/LoginPage.module.scss';
import {useHistory} from "react-router-dom";
import {Provider} from "react-redux";
import {Store} from "@reduxjs/toolkit";
import Routes from "@/Routes";


export interface RootProps {
    store: Store;
}

const App = ({ store }: RootProps): JSX.Element => (
    <Provider store={store}>
        <Routes />
    </Provider>
);
export default App;
