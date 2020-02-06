import './MainPage.scss';

import React from 'react';
import { Redirect } from 'react-router-dom'
import PicturesGalleryContainer from '~/modules/PicturesGallery/container/PicturesGalleryContainer.jsx';

export default function MainPage() {
    return (
        <main>
            {!localStorage.getItem('uid') ? <Redirect to="/auth" /> : <PicturesGalleryContainer />}
        </main>
    );
};