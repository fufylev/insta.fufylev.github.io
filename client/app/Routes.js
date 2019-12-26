import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '~/layouts/MainPage/MainPage.jsx';
import Header from "~/modules/Header/containers/Header.jsx";
import Footer from "~/modules/Footer/Footer.jsx";

export default function Routes() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="main-container">
                <Switch>
                    <Route exact path="/"><MainPage/></Route>
                </Switch>
            </div>
            <Footer/>
        </div>
    );
}