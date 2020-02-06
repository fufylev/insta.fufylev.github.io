import './InstagramLogo.scss';

import React from 'react';

import instagramLogo from '~/assets/img/insta.svg';
import { Link } from 'react-router-dom';

export default function InstagramLogo() {
    return (
        <Link to="/" className="">
            <img src={instagramLogo} alt="logo" className="instagram-logo"/>
        </Link>
    );
};