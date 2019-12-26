import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '~/layouts/MainPage/MainPage.jsx';

export default function Routes() {
    return (
        <div className="wrapper">
            <div className="main-container">
                <Switch>
                    <Route exact path="/"><MainPage/></Route>
                </Switch>
            </div>
        </div>
    );
}