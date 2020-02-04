import './index.scss';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '~/actions/authentication';
import AppStores from '~/modules/Authentication/components/AppStores.jsx';
import InstagramLogo from '~/libs/components/InstagramLogo/InstagramLogo.jsx';
import PhonePicture from '~/modules/Authentication/components/PhonePicture.jsx';
import SingIn from '~/modules/Authentication/components/SingUpLogIn.jsx';
import { connect } from 'react-redux';
import Input from '~/modules/Authentication/components/Input';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onChangeHandler = (event) => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(login(this.state));
    };

    render() {
        const { email, password } = this.state;
        const { error, isLoggedIn } = this.props;

        return (
            <main className="register">
                {isLoggedIn === true && <Redirect to="/"/>}
                <PhonePicture/>
                <div className="register-form">
                    <div className="top">
                        <InstagramLogo />
                        <h3>Please, Log in.</h3>
                        <form onSubmit={this.handleSubmit}>
                            <Input onChange={this.onChangeHandler} name='email' value={email}/>
                            <Input onChange={this.onChangeHandler} name='password' value={password}/>
                            {error && <div className="error">{error}</div>}
                            <button className="form-submit"
                                type="submit"
                                onClick={() => this.handleSubmit}>Log in
                            </button>
                        </form>
                    </div>
                    <SingIn data={{
                        text:"Don't have an account?",
                        path: '/register',
                        action: 'Sign up'
                    }}/>
                    <p className="app">Get the app.</p>
                    <br/>
                    <AppStores/>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.authentication };
}

export default connect(mapStateToProps)(LogIn);