import './MainPage.scss';

import React from 'react';
import { Redirect } from 'react-router-dom'
import HomePage from '~/modules/HomePage/HomePage.jsx';

export default function MainPage() {
    return (
        <main>
            {!localStorage.getItem('uid') ? <Redirect to="/auth" /> : <HomePage />}
        </main>
    );
};