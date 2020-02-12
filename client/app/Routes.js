import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MainPage from '~/layouts/MainPage/MainPage.jsx';
import Header from '~/modules/Header/containers/Header.jsx';
import Register from '~/modules/Authentication/containers/Register.jsx';
import LogIn from './modules/Authentication/containers/LogIn.jsx';
import {User} from './modules/User/User.jsx';
import { PicturesGalleryContainer } from '~/modules/PicturesGallery/container/PicturesGalleryContainer.jsx';
import PageNotFound from '~/components/PageNotFound/PageNotFound.jsx';
import UserEditForm from './modules/User/components/UserEditForm/UserEditForm.jsx';

const Routes = (props) => {
    return (
        <div className="wrapper">
            {localStorage.getItem('uid') && props.isLoggedIn && <Header/>}
            <div className="main-container">
                <Switch>
                    <Route exact path="/"><MainPage/></Route>
                    <Route path="/register"><Register/></Route>
                    <Route path="/auth"><LogIn/></Route>
                    <Route path='/user/edit'><UserEditForm/></Route>
                    <Route path="/user"><User/></Route>
                    <Route path="/pictures"><PicturesGalleryContainer/></Route>
                    <Route path="/error404"><PageNotFound/></Route>
                    <Route path="*"><PageNotFound/></Route>
                </Switch>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(Routes)