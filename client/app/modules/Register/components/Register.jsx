import './Register.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import MobileEmailInput from '~/modules/Register/components/MobileEmailInput.jsx';
import PasswordInput from '~/modules/Register/components/PasswordInput.jsx';
import FullNameInput from '~/modules/Register/components/FullNameInput.jsx';
import UserNameInput from '~/modules/Register/components/UserNameInput.jsx';
import AppStores from '~/modules/Register/components/AppStores.jsx';
import InstagramLogo from '~/libs/components/InstagramLogo/InstagramLogo.jsx';
import PhonePicture from '~/modules/Register/components/PhonePicture.jsx';
import SingIn from '~/modules/Register/components/SingIn.jsx';

import { load } from '~/modules/Register/actions';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { mobileOrEmail, userName, password, sendFormToServer } = this.props;
        if (mobileOrEmail && userName && password) {
            sendFormToServer();
        } else {
            console.log('не все обязательные поля заполнены!')
        }

    };

    render() {
        const { mobileOrEmail, fullName, userName, password, errorRegister } = this.props;

        return (
            <div className="register">
                <PhonePicture />
                <div className="register-form">
                    <div className="top">
                        <InstagramLogo />
                        <h3>Sign up to see photos and videos from your friends.</h3>
                        <form onSubmit={this.handleSubmit}>
                            <MobileEmailInput value={mobileOrEmail}/><br/>
                            <FullNameInput value={fullName}/><br/>
                            <UserNameInput value={userName}/><br/>
                            <PasswordInput value={password}/><br/>
                            {errorRegister && <div className="error">{errorRegister}</div>}
                            <button className="form-submit" type="submit"
                                onClick={() => this.handleSubmit}>Sing up
                            </button>
                        </form>
                    </div>
                    <SingIn />
                    <p className="app">Get the app.</p>
                    <br/>
                    <AppStores />
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        // its reducer to be cleared
    }

}

function mapStateToProps(state, props) {
    return {...state.register};
}

function mapDispatchToProps(dispatch, props) {
    return {
        sendFormToServer: () => dispatch(load()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);