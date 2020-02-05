import './MainPage.scss';

import React from 'react';
import { Redirect } from 'react-router-dom'
import PicturesGallery from '~/modules/PicturesGallery/PicturesGallery.jsx';

export default function MainPage() {
    return (
        <main>
            {!localStorage.getItem('uid') ? <Redirect to="/auth" /> : <PicturesGallery />}
        </main>
    );
};