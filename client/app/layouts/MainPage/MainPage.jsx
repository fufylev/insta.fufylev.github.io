import './MainPage.scss';

import React from 'react';
import { Redirect } from 'react-router-dom';
import DashBoard from '~/modules/DashBoard/DashBoard.jsx';

export default function MainPage() {
    return (
        <main>
            {!localStorage.getItem('uid') ? <Redirect to="/auth"/> : <DashBoard/>}
        </main>
    );
};