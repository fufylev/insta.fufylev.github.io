import './RegisterContainer.scss';

import React from 'react';
import { Redirect } from 'react-router-dom';

import Register from '~/modules/Register/components/Register.jsx';

export default function RegisterContainer() {
    return (
        <main>
            {localStorage.getItem('token') ? <Redirect to="/" /> : <Register />}
        </main>
    );
};
