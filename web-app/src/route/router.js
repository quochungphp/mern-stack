import React from 'react';

import NotfoundPage from '../frontend/containers/NotfoundPage';
import HomePage from '../frontend/containers/HomePage';
import LoginPage from '../frontend/components/Login/LoginPage';
import Checkout from '../frontend/containers/Checkout';
import Order from '../frontend/containers/Order';


const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/checkout',
        exact: true,
        main: () => <Checkout />
    },
    {
        path: '/order',
        exact: true,
        main: () => <Order />
    },
    {
        path: '/login',
        exact: true,
        main: () => <LoginPage  />
    },
    {
        path: '',
        exact: true,
        main: () => <NotfoundPage />
    },

];

export default routes;
