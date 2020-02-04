import './MainPage.scss';

import React from 'react';
import { Redirect } from 'react-router-dom'
import PicturesGallary from '~/modules/PicturesGallary/PicturesGallary.jsx';

export default function MainPage() {
    return (
        <main>
            {!localStorage.getItem('uid') ? <Redirect to="/auth" /> : <PicturesGallary />}
        </main>
    );
};